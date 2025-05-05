import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:osm_nominatim/osm_nominatim.dart';
import 'navigation.dart' as b;

// Handels entered location for a destination
class EnterLocationScreen extends StatefulWidget {
  final Function(String) geoCode;
  final bool isConnected;
  final bool connectionFailed;
  final VoidCallback onRetryConnection;

  const EnterLocationScreen({
    super.key,
    required this.geoCode,
    required this.isConnected,
    required this.connectionFailed,
    required this.onRetryConnection,
  });

  @override
  // ignore: library_private_types_in_public_api
  _EnterLocationScreenState createState() => _EnterLocationScreenState();
}

class _EnterLocationScreenState extends State<EnterLocationScreen> {
  final TextEditingController _locationController = TextEditingController();
  List<Place> _places = [];

  // Timer doubounce used to stop constant API calls
  Timer? _debounce;

  // Return a list of places from input string
  void _getPlaces(String data) async {
    if (_debounce?.isActive ?? false) _debounce!.cancel();

    _debounce = Timer(const Duration(milliseconds: 600), () async {
      if (data.trim().isEmpty) {
        setState(() => _places = []);
        return;
      }

      final results = await _fetchLocationIQAutocomplete(data);
      setState(() => _places = results);
    });
  }

  // API call for location suggestions 
  Future<List<Place>> _fetchLocationIQAutocomplete(String query) async {
    const apiKey = 'pk.0a7715a15cacf50450b85a4b65bd8204';
    final url = Uri.parse(
      'https://us1.locationiq.com/v1/autocomplete.php?key=$apiKey&q=${Uri.encodeComponent(query)}&limit=5&format=json',
    );

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((item) {
          return Place(
            lat: double.parse(item['lat']),
            lon: double.parse(item['lon']),
            displayName: item['display_name'],
            placeId: int.tryParse(item['place_id'].toString()) ?? 0,
            osmType: item['osm_type'] ?? 'node',
            osmId: int.tryParse(item['osm_id'].toString()) ?? 0,
            boundingBox: const [],
            placeRank: int.tryParse(item['place_rank']?.toString() ?? '0') ?? 0,
            category: item['category'] ?? '',
            type: item['type'] ?? '',
            importance:
                double.tryParse(item['importance']?.toString() ?? '0.0') ?? 0.0,
          );
        }).toList();
      } else {
        debugPrint("Autocomplete error: ${response.statusCode}");
      }
    } catch (e) {
      debugPrint("Autocomplete exception: $e");
    }

    return [];
  }

  // Select a returned location from the results dropdown
  void _selectPlace(Place place) {
    setState(() {
      _locationController.text = place.displayName;
      _places = [];
      b.MapScreenState.titleDisplay = "Refresh Current Location   -> ";
    });
    widget.geoCode(place.displayName);
  }

  // Once again clean up from tree
  @override
  void dispose() {
    _locationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          const SizedBox(height: 30),
          TextField(
            controller: _locationController,
            onChanged: _getPlaces,
            decoration: InputDecoration(
              hintText: 'Where are you off to?',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12.0),
              ),
              filled: true,
              fillColor: Colors.grey[100],
            ),
          ),
          const SizedBox(height: 10),
          if (_places.isNotEmpty)
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: Colors.grey[300]!),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: ListView.builder(
                  itemCount: _places.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(_places[index].displayName),
                      onTap: () => _selectPlace(_places[index]),
                      leading: Icon(Icons.location_pin, color: Colors.green),
                    );
                  },
                ),
              ),
            ),
          const SizedBox(height: 10),
          if (widget.connectionFailed)
            Column(
              children: [
                Text(
                  'Bluetooth Connection Failed',
                  style:
                      TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                ElevatedButton.icon(
                  onPressed: widget.onRetryConnection,
                  icon: Icon(Icons.refresh),
                  label: const Text('Try Again'),
                ),
              ],
            )
          else
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  widget.isConnected
                      ? Icons.bluetooth_connected
                      : Icons.bluetooth_disabled,
                  color: widget.isConnected ? Colors.green : Colors.red,
                ),
                const SizedBox(width: 8),
                Text(
                  widget.isConnected
                      ? 'Bluetooth Device Connected'
                      : 'Bluetooth Device Not Connected',
                  style: TextStyle(
                    color: widget.isConnected ? Colors.green : Colors.red,
                  ),
                ),
              ],
            ),
        ],
      ),
    );
  }
}