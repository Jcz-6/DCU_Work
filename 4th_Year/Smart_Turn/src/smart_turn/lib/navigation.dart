// ignore_for_file: unused_local_variable

import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'bluetooth.dart';
import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

/// Page for displaying route and loactions to tap
class MapScreen extends StatefulWidget {
  final Function(LatLng) onLocationSelected;
  final LatLng startCoordinates;

  const MapScreen({
    super.key,
    required this.onLocationSelected,
    required this.startCoordinates,
  });

  @override
  State<MapScreen> createState() => MapScreenState();
}

class MapScreenState extends State<MapScreen> with WidgetsBindingObserver {
  LatLng? _userLocation;
  LatLng? _selectedLocation;
  List<LatLng> _routePolyline = [];
  bool _isLoading = true;
  // ignore: unused_field
  bool _destinationReached = false;
  static String titleDisplay = "Select Destination";

  // Turn-by-turn navigation
  List<NavigationStep> _navigationSteps = [];
  int _currentStepIndex = 0;
  String _currentInstruction = "Select a destination";
  double _distanceToDestination = 0.0;
  double _distanceToNextTurn = 0.0;
  String _d = "";
  //New implementation?
  StreamSubscription<Position>? _positionStreamSubscription;
  double _osrmDistance = 0.0;
  String _nextTurn = "";
  double _nextDist = 0.0;

  /// Configurable parameters
  static const double destinationReached = 0.025; // 25 Meters
  static const double turnThreshold = 0.02; // 20 Meters
  static const double minimumNavigationDistance = 0.1; // 100 Meters

  @override
  void initState() {
    super.initState();
    _startLocationUpdates();
    WidgetsBinding.instance.addObserver(this);

    // Ensures background functionality
    bg.BackgroundGeolocation.ready(bg.Config(
            desiredAccuracy: bg.Config.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10.0,
            stopOnTerminate: false,
            startOnBoot: true,
            debug: false,
            logLevel: bg.Config.LOG_LEVEL_ERROR))
        .then((bg.State state) {
      if (!state.enabled) {
        bg.BackgroundGeolocation.start();
      }
    });
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel();
    WidgetsBinding.instance.removeObserver(this);
    _heartbeatTimer?.cancel();
    super.dispose();
  }

  //Used to execute code every 1 seconds for background updates
  Timer? _heartbeatTimer;

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _heartbeatTimer?.cancel();
    } else if (state == AppLifecycleState.paused) {
      _heartbeatTimer = Timer.periodic(Duration(seconds: 1), (timer) async {
        bg.BackgroundGeolocation.getCurrentPosition(
                persist: false, // <-- do not persist this location
                desiredAccuracy: 0, // <-- desire best possible accuracy
                timeout: 30000, // <-- wait 30s before giving up.
                samples: 1 // <-- sample 1 location before selecting best.
                )
            .then((bg.Location location) async {
          _userLocation =
              LatLng(location.coords.latitude, location.coords.longitude);
          Future.delayed(Duration(milliseconds: 100), () {
            _fetchRoute();
          });
        }).catchError((error) {
          debugPrint('[getCurrentPosition] ERROR: $error');
        });
      });
    }
  }

  // Sets destination from the users choice for route calculation
  void setDestination(LatLng destination) {
    if (mounted) {
      // Make sure the widget is still in the tree!!!
      setState(() {
        _selectedLocation = destination;
        _destinationReached = false;
        _currentInstruction = "Calculating route";
      });

      // Check if user location is too close to current location
      if (_userLocation != null) {
        // straight line distance check
        double distance = _calculateDistance(_userLocation!, destination);
        // 100 meters check for location input
        if (distance < minimumNavigationDistance) {
          // Return the distance of attempted Selected location
          setState(() {
            _currentInstruction =
                "Destination too close (${(distance * 1000).toStringAsFixed(0)}m)";
            _selectedLocation = null;
            _routePolyline = [];
            _navigationSteps = [];
          });
          BluetoothManager.instance.sendData("Destination too close");
          return;
        }
      }

      widget.onLocationSelected(destination);
      // Allow loading time for the UI update
      Future.delayed(Duration(milliseconds: 200), () {
        _fetchRoute();
      });
    }
  }

  // Update Users location every 2 meters moved
  void _startLocationUpdates() {
    _positionStreamSubscription = Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.bestForNavigation,
        distanceFilter: 2,
      ),
    ).listen((Position position) async {
      if (!mounted) return;

      setState(() {
        _userLocation = LatLng(position.latitude, position.longitude);
        _isLoading = false;
      });

      // Added for road snap prevention issues
      // Stop calling when reach destination
      final check = _calculateDistance(_userLocation!, _selectedLocation!);
      if (check > 0.03) {
        _fetchRoute();
      }

      _updateNavigation();

      // Update the navigation on movement
      if (_navigationSteps.isNotEmpty) {
        final expectedStep = _navigationSteps[_currentStepIndex];
        final deviation =
            _calculateDistance(_userLocation!, expectedStep.endLocation);
        // Recalculate if off by 30 meters
        if (deviation > 0.03) {
          _fetchRoute();
        }
      }
    }, onError: (e) {
      debugPrint("Location stream error: $e");
    });
  }

  /// Obtains the users current location using the Geolocator Service
  Future<void> _getUserLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.bestForNavigation,
      );
      setState(() {
        _userLocation = LatLng(position.latitude, position.longitude);
        _isLoading = false;
      });
    } catch (e) {
      debugPrint("Error getting location: $e");
      setState(() {
        _isLoading = false;
      });
    }
  }

  /// Function for map tap to set the desired destination
  void _onMapTap(TapPosition tapPosition, LatLng latlng) {
    setState(() {
      titleDisplay = "Refresh Current Location   -> ";
    });
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm Location'),
          content:
              Text('Are you sure you want to set this as your destination?'),
          actions: [
            TextButton(
              child: Text('No'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),

            // Set location and pop context bubble if "Yes" is selected
            TextButton(
              child: Text('Yes'),
              onPressed: () {
                Navigator.of(context).pop();
                _confirmLocationSelection(latlng);
              },
            ),
          ],
        );
      },
    );
  }

  // Map tap functionality -> Original function of _onMapTap before it turned into bubble
  Future<void> _confirmLocationSelection(LatLng latlng) async {
    setState(() {
      _destinationReached = false;
      _selectedLocation = latlng;
      _currentInstruction = "Calculating route";
    });

    // Check if the selected location is too close
    if (_userLocation != null) {
      double distance = _calculateDistance(_userLocation!, latlng);
      // 100 meters??
      if (distance < minimumNavigationDistance) {
        await showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Destination Too Close"),
            content: Text("Selected destination is only ${(distance * 1000).toStringAsFixed(0)} meters away. Destination must be < 100m"),
            actions: [
              TextButton(
                child: Text("OK"),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          );
        },
      );
        setState(() {
          _currentInstruction =
              "Destination too close (${(distance * 1000).toStringAsFixed(0)}m)";
          _selectedLocation = null;
          _routePolyline = [];
          _navigationSteps = [];
          titleDisplay = "Refresh Current Location -> ";
        });
        BluetoothManager.instance.sendData("Destination too close");
        return;
      }
    }

    widget.onLocationSelected(latlng);
    _fetchRoute();
  }

  // Private function for calculating distance and returning it in kilometers (Straight line distance)
  double _calculateDistance(LatLng point1, LatLng point2) {
    return Geolocator.distanceBetween(point1.latitude, point1.longitude,
            point2.latitude, point2.longitude) /
        1000;
  }

  // Update the turn by turn navigation from current location
  // TODO: Add edge case prevention & Fix
  void _updateNavigation() {
    if (_userLocation == null || _navigationSteps.isEmpty) return;

    final currentStep = _navigationSteps[_currentStepIndex];
    _distanceToNextTurn =
        _calculateDistance(_userLocation!, currentStep.endLocation);
    //Needed for destination reached
    _distanceToDestination =
        _calculateDistance(_userLocation!, _selectedLocation!);

    // Recalculate instruction on every update
    _updateCurrentInstruction();

    // Destination reached check
    if (_distanceToDestination < destinationReached) {
      setState(() {
        _destinationReached = true;
        _currentInstruction = "Destination Reached!";
      });
      BluetoothManager.instance.sendData("Destination Reached!");
      return;
    }
  }

  // Update next navigation instruction
  void _updateCurrentInstruction() {
    if (_currentStepIndex < _navigationSteps.length) {
      String formatTurnDistance;
      if (_nextDist < 1) {
        formatTurnDistance = "${(_nextDist * 1000).toStringAsFixed(0)}m";
      } else {
        formatTurnDistance = "${_nextDist.toStringAsFixed(2)}km";
      }

      String formatDistance;
      if (_osrmDistance < 1000) {
        formatDistance = "${_osrmDistance.toStringAsFixed(0)}m";
      } else {
        formatDistance = "${(_osrmDistance / 1000).toStringAsFixed(2)}km";
      }
      final cleanedInstruction =
          "Total: $formatDistance\n$_nextTurn: $formatTurnDistance\n\n";

      setState(() {
        _currentInstruction = cleanedInstruction;
      });
      BluetoothManager.instance.sendData(cleanedInstruction);
    }
  }

  /// Main function for calculating the route from the users location
  /// to their desired destination using the OSRM API
  Future<void> _fetchRoute() async {
    if (_selectedLocation == null || _userLocation == null) return;

    final url = "http://router.project-osrm.org/route/v1/cycling/"
        "${_userLocation!.longitude},${_userLocation!.latitude};"
        "${_selectedLocation!.longitude},${_selectedLocation!.latitude}"
        "?steps=true&overview=full&geometries=polyline";

    try {
      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final totalDistance = data["routes"][0]["distance"];
        final distanceKilometer = totalDistance / 1000;

        setState(() {
          _distanceToDestination = distanceKilometer;
        });

        _parseNavigationSteps(data);

        if (data["routes"] != null && data["routes"].isNotEmpty) {
          final route = data["routes"][0];
          final encodedPolyline = route["geometry"];
          setState(() {
            _routePolyline = _decodePolyline(encodedPolyline);
          });
        }
        final route = data["routes"][0];
        final legs = route["legs"];
        if (legs != null && legs.isNotEmpty) {
          final steps = legs[0]["steps"];
          // Avoid Null value
          // First turn point is semi redundant in our context so we take the next
          if (steps[1] != null) {
            _nextTurn = steps[1]["maneuver"]["modifier"] ?? "straight";
          } else {
            _nextTurn = "straight";
          }

          if (steps[1] != null) {
            final location = steps[1]["maneuver"]["location"];
            final locationPoints = LatLng(location[1], location[0]);
            _nextDist = _calculateDistance(_userLocation!, locationPoints);
          } else {
            final location = steps[0]["maneuver"]["location"];
            final locationPoints = LatLng(location[1], location[0]);
            _nextDist = _calculateDistance(_userLocation!, locationPoints);
          }

          // TODO: Use this approach for making mock showcase
          for (var step in steps) {
            final instruction = step["maneuver"]["modifier"];
            final distance = (step["distance"] as num).toDouble();
            // Calculate distance from user to location using Str8 line
            final location = step["maneuver"]["location"];
            final locationP = LatLng(location[1], location[0]); // lat, lon
            // Straight line distance to next turn
          }
          // Same here for int handling
          _osrmDistance = (route["distance"] as num).toDouble();
        }

        _currentStepIndex = 0;
        _updateCurrentInstruction();
        // Try again if it fails?
      } else {
        _fetchRoute();
      }
    } catch (e) {
      debugPrint("Error fetching route: $e");
      setState(() {
        _currentInstruction = "Error calculating route";
      });
      BluetoothManager.instance.sendData("Error calculating route");
    }
  }

  // Parses the returned route data from OSRM API call
  void _parseNavigationSteps(Map<String, dynamic> routeData) {
    _navigationSteps = [];

    if (routeData["routes"] == null || routeData["routes"].isEmpty) return;

    final steps = routeData["routes"][0]["legs"][0]["steps"];

    for (var step in steps) {
      final maneuver = step["maneuver"];
      final location = LatLng(
        maneuver["location"][1],
        maneuver["location"][0],
      );

      // Needed cast as would return int sometimes
      double distance = (step["distance"] as num).toDouble() / 1000;
      if (_distanceToNextTurn < 0.1) {
        _d = "${(_distanceToNextTurn * 1000).toStringAsFixed(0)}m";
      } else {
        _d = "${_distanceToNextTurn.toStringAsFixed(2)}km";
      }

      String instruction = _getInstructionFromManeuver(
          maneuver["type"], maneuver["modifier"], distance);

      _navigationSteps.add(NavigationStep(
        instruction: instruction,
        distance: distance,
        endLocation: location,
      ));
    }
  }

  // Function for maintaining simplistic left and right turn instructions for cyclists
  String _getInstructionFromManeuver(
      String type, String? modifier, double distance) {
    String direction;
    switch (modifier) {
      case "left":
      case "slight left":
      case "sharp left":
        direction = "Left";
        break;
      case "right":
      case "slight right":
      case "sharp right":
        direction = "Right";
        break;
      default:
        direction = "Straight";
        break;
    }

    if (type == "arrive") {
      return "Destination ahead in $distance";
    }

    return "Total: ${_distanceToDestination.toStringAsFixed(2)}km\n $direction in $_d";
  }

  // Displays the polyline from user to location
  List<LatLng> _decodePolyline(String encodedPolyline) {
    List<PointLatLng> polylinePoints =
        PolylinePoints().decodePolyline(encodedPolyline);
    return polylinePoints
        .map((point) => LatLng(point.latitude, point.longitude))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // TODO: Change to "Refresh Location"
        title: Text(titleDisplay),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _getUserLocation,
          ),
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Expanded(
                  child: FlutterMap(
                    options: MapOptions(
                      initialCenter: _userLocation ?? widget.startCoordinates,
                      initialZoom: 15.0,
                      onTap: _onMapTap,
                    ),
                    children: [
                      TileLayer(
                        urlTemplate:
                            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                        subdomains: ['a', 'b', 'c'],
                      ),
                      MarkerLayer(
                        markers: [
                          if (_userLocation != null)
                            Marker(
                              point: _userLocation!,
                              width: 50.0,
                              height: 50.0,
                              child: const Icon(Icons.location_on_sharp,
                                  color: Color.fromARGB(255, 19, 0, 71),
                                  size: 30),
                            ),
                          if (_selectedLocation != null)
                            Marker(
                              point: _selectedLocation!,
                              width: 50.0,
                              height: 50.0,
                              child: const Icon(Icons.location_pin,
                                  color: Colors.red, size: 30),
                            ),
                        ],
                      ),
                      if (_routePolyline.isNotEmpty)
                        PolylineLayer(
                          polylines: [
                            Polyline(
                              points: _routePolyline,
                              strokeWidth: 4.0,
                              color: const Color.fromRGBO(76, 175, 80, 1),
                              borderColor: Color.fromARGB(255, 19, 0, 71),
                              borderStrokeWidth: 5.5,
                            ),
                          ],
                        ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}

// Navigation step model
class NavigationStep {
  final String instruction;
  final double distance;
  final LatLng endLocation;

  NavigationStep({
    required this.instruction,
    required this.distance,
    required this.endLocation,
  });
}
