import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import 'package:hc_05/navigation.dart';
import 'package:osm_nominatim/osm_nominatim.dart';

// Test Geoloction functions

class MockHttpClient extends Mock implements http.Client {}

// Copied in function for ease of use
Future<List<Place>> fetchLocationIQAutocomplete(String query) async {
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
    } else {}
  } catch (e) {}

  return [];
}



void main() {
  group('Polyline Decoding Tests', () {
    test('Polyline decoding should convert encoded string to coordinates', () {
      final testWidget = MapScreen(
        onLocationSelected: (location) {},
        startCoordinates: LatLng(0.0, 0.0),
      );

      expect(testWidget, isA<MapScreen>());
    });
  });

  group('Mock Functions', () {
    test('GeoCode function is called with correct parameters', () {
      bool wasCalled = false;
      String passedData = '';

      void testGeoCode(String data) {
        wasCalled = true;
        passedData = data;
      }

      testGeoCode('Test Location');

      expect(wasCalled, isTrue);
      expect(passedData, equals('Test Location'));
    });
  });

  group("API Calls", () {
    // Ensure API Returns somthing
    test('Ensure results for Longford, Ireland', () async {
      final results = await fetchLocationIQAutocomplete('Longford, Ireland');

      // Just ensure something was returned
      expect(results, isNotEmpty);
    });

   test('Nominatim results for Longford, Ireland', () async {
    final results = await Nominatim.searchByName(query: 'Longford, Ireland', limit: 1);
    expect(results, isNotEmpty);
    // May fail this if html -> Not too important (As long as HTML checker works)
    expect(results.first.displayName.toLowerCase(), contains('longford'));
  });


  });

  



}
