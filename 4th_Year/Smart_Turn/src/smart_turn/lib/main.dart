import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:http/http.dart' as http;
import 'package:geocoding/geocoding.dart';
import 'package:osm_nominatim/osm_nominatim.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart' as bl2;
import 'bluetooth.dart';
import 'location.dart';
import 'navigation.dart';

// Main Flutter Entry point
void main() {
  bl2.FlutterBluePlus.setLogLevel(
      bl2.LogLevel.error); // Enable verbose logging
  runApp(SmartTurnApp());
}

// Main initial App widget
class SmartTurnApp extends StatefulWidget {
  const SmartTurnApp({super.key});

  @override
  State<SmartTurnApp> createState() => _SmartTurnAppState();
}

class _SmartTurnAppState extends State<SmartTurnApp> {
  int _currentIndex = 0;
  final List<Widget> _pages = [];
  final BluetoothManager _bluetoothManager = BluetoothManager.instance;
  final BleManager _bleManager = BleManager.instance;
  bool _isConnected = false;
  bool _connectionFailed = false;
  LatLng _selectedLocation = LatLng(0.0, 0.0);
  final GlobalKey<MapScreenState> _mapScreenKey = GlobalKey<MapScreenState>();
  bool _permissionsGranted = false;
  bool checkingPermissions = true;

  @override
  void initState() {
    super.initState();
    _checkAndRequestPermissions(); //_initialiseApp is in here
  }

  // Prompt user for location permission
  // Used already in use packages for permissionsinstead of Permission handler
  // Geolocator and Bluetooth helped due to conflicting versions
  Future<void> _checkAndRequestPermissions() async {
    bool locationGranted = false;
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }
      locationGranted = permission == LocationPermission.always ||
          permission == LocationPermission.whileInUse;
    } catch (e) {
      debugPrint('Error checking location permissions: $e');
    }

    // Check Bluetooth permissions
    bool bluetoothGranted = false;
    try {
      bluetoothGranted = await bl2.FlutterBluePlus.isAvailable;
    } catch (e) {
      debugPrint('Bluetooth permissions: $e');
    }

    setState(() {
      _permissionsGranted = locationGranted && bluetoothGranted;
      checkingPermissions = false;
    });

    if (_permissionsGranted) {
      _initializeApp(); // Original Fucntion of init state
    } else {
      if (mounted) {
        // Ask permissions
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => AlertDialog(
            title: const Text('Permissions Required'),
            content: const Text(
                'Location and Bluetooth permissions are necessary please ensure access rights'),
            actions: [
              TextButton(
                onPressed: () async {
                  Navigator.pop(context);
                  // Quick mobile navigation for user convienience
                  await Geolocator.openAppSettings();
                },
                child: const Text('Open Settings'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                  _checkAndRequestPermissions();
                },
                child: const Text('Try Again'),
              ),
            ],
          ),
        );
      }
    }
  }

  // App is initialised and attempts to connect to ble upon initialisation
  void _initializeApp() async {
    bool connected = await _bluetoothManager.connectToHC05();

    Future.delayed(Duration(milliseconds: 4500), () {
      _bleManager.connectBLE();
    });
    setState(() {
      _isConnected = connected;
      _connectionFailed = !connected;
    });

    // Add the pages for text input and on map tap input
    _pages.addAll([
      EnterLocationScreen(
        geoCode: _geoCode,
        isConnected: _isConnected,
        connectionFailed: _connectionFailed,
        onRetryConnection: _retryBluetoothConnection,
      ),
      MapScreen(
        key: _mapScreenKey,
        onLocationSelected: _onLocationSelected,
        startCoordinates: _selectedLocation,
      ),
    ]);

    // Return a list of places from input string

    if (connected) {
      _bluetoothManager.receiveData(_bleManager);
    }
  }

  // The retry function that utalised the Bluetooth managers
  // disconnect function to retry to connect to device
  Future<void> _retryBluetoothConnection() async {
    setState(() {
      _connectionFailed = false;
    });

    // Ensures there is no current connection before retrying
    await _bluetoothManager.disconnect();

    bool connected = await _bluetoothManager.connectToHC05();
    setState(() {
      _isConnected = connected;
      _connectionFailed = !connected;

      // Load up screen again displaying connection status
      _pages[0] = EnterLocationScreen(
        geoCode: _geoCode,
        isConnected: _isConnected,
        connectionFailed: _connectionFailed,
        onRetryConnection: _retryBluetoothConnection,
      );
    });
  }

  // Selecting destination
  void _onLocationSelected(LatLng location) {
    setState(() {
      _selectedLocation = location;
    });
  }

  // Nomintan would oddly return <html
  bool _looksLikeHtml(String text) {
    return text.contains('<!DOCTYPE html>') || text.contains('<html');
  }

  Future<LatLng?> _fetchLocationIQCoords(String query) async {
    const apiKey = 'pk.0a7715a15cacf50450b85a4b65bd8204';
    final url = Uri.parse(
      'https://us1.locationiq.com/v1/search.php?key=$apiKey&q=${Uri.encodeComponent(query)}&format=json&limit=1',
    );

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        if (data.isNotEmpty) {
          final location = data.first;
          return LatLng(
              double.parse(location['lat']), double.parse(location['lon']));
        }
      } else {
        debugPrint("LocationIQ error: ${response.statusCode}");
      }
    } catch (e) {
      debugPrint("LocationIQ exception: $e");
    }
    return null;
  }

  /// Uses the LocationIQ || Nominatim || Flutter Geocoder for geocoding the text input
  /// and turning it to coordinates to be used for directions
  /// Set state to automatically Go to screen display
  void _geoCode(String data) async {
    try {
      final locationIQResult = await _fetchLocationIQCoords(data);
      if (locationIQResult != null) {
        _mapScreenKey.currentState?.setDestination(locationIQResult);
        setState(() {
          _currentIndex = 1;
        });
        return;
      }

      // Fall back to Nominatim -> OG call that worked
      List<Place> places = await Nominatim.searchByName(query: data, limit: 1);
      if (places.isNotEmpty && !_looksLikeHtml(places.first.displayName)) {
        final place = places.first;
        _mapScreenKey.currentState
            ?.setDestination(LatLng(place.lat, place.lon));
        setState(() {
          _currentIndex = 1;
        });
        return;
      }

      // Pray we dont use this
      List<Location> locations = await locationFromAddress(data);
      if (locations.isNotEmpty) {
        final loc = locations.first;
        _mapScreenKey.currentState
            ?.setDestination(LatLng(loc.latitude, loc.longitude));
        setState(() {
          _currentIndex = 1;
        });
        return;
      }

      debugPrint("All geocoding methods failed.");
    } catch (e) {
      debugPrint("Geocoding failed: $e");
    }
  }

  // Clean up from tree
  @override
  void dispose() {
    _bluetoothManager.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
        ),
        body: IndexedStack(
          index: _currentIndex,
          children: _pages,
        ),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.location_on),
              label: 'Enter Location',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.map),
              label: 'Select on Map',
            ),
          ],
        ),
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(76, 175, 80, 1),
          title: const Text('Smart Turn'),
        ),
      ),
    );
  }
}

//From longford to edgeworthstown curl "http://router.project-osrm.org/route/v1/driving/-7.611088,53.6955501;-7.8053694,53.725448?overview=false"
// For turn by turn use curl "http://router.project-osrm.org/route/v1/driving/-7.611088,53.6955501;-7.8053694,53.725448?steps=true"
