import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import 'package:mocktail/mocktail.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:geolocator/geolocator.dart';
import 'package:osm_nominatim/osm_nominatim.dart';
import 'package:hc_05/main.dart';
import 'package:hc_05/bluetooth.dart';
import 'package:hc_05/navigation.dart';


// Mock classes
class MockBluetoothManager extends Mock implements BluetoothManager {}
class MockBluetoothConnection extends Mock implements BluetoothConnection {}
class MockGeolocator extends Mock implements GeolocatorPlatform {}
class MockPosition extends Mock implements Position {}
class MockPlace extends Mock implements Place {}

void main() {
  late MockBluetoothManager mockBluetoothManager;

  setUp(() {
    mockBluetoothManager = MockBluetoothManager();
    when(() => mockBluetoothManager.connectToHC05()).thenAnswer((_) async => true);
    when(() => mockBluetoothManager.isConnected).thenReturn(true);
    when(() => mockBluetoothManager.sendData(any())).thenAnswer((_) async => true);
  });

  group('SmartTurnApp Widget Tests', () {
    testWidgets('SmartTurnApp initializes with correct title', (WidgetTester tester) async {
      await tester.pumpWidget(const SmartTurnApp());
      await tester.pumpAndSettle();
      
      expect(find.text('Smart Turn'), findsOneWidget);
      expect(find.byType(AppBar), findsOneWidget);
      expect(find.byType(BottomNavigationBar), findsOneWidget);
    });

    testWidgets('Bottom navigation has correct items', (WidgetTester tester) async {
      await tester.pumpWidget(const SmartTurnApp());
      await tester.pumpAndSettle();
      
      expect(find.text('Enter Location'), findsOneWidget);
      expect(find.text('Select on Map'), findsOneWidget);
      expect(find.byIcon(Icons.location_on), findsOneWidget);
      expect(find.byIcon(Icons.map), findsOneWidget);
    });
  });


  group('MapScreen Widget Tests', () {
    testWidgets('Shows loading indicator initially', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: MapScreen(
          onLocationSelected: (_) {},
          startCoordinates: LatLng(0.0, 0.0),
        ),
      ));
      
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    

    testWidgets('Has refresh button in app bar', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: MapScreen(
          onLocationSelected: (_) {},
          startCoordinates: LatLng(0.0, 0.0),
        ),
      ));
      
      expect(find.byIcon(Icons.refresh), findsOneWidget);
    });
  });

  

  group('NavigationStep Tests', () {
    test('NavigationStep initializes correctly', () {
      // Minimal Display of returned data from osrm
      final step = NavigationStep(
        instruction: 'Turn right',
        distance: 0.5,
        endLocation: LatLng(53.5, -7.5),
      );
      
      expect(step.instruction, 'Turn right');
      expect(step.distance, 0.5);
      expect(step.endLocation.latitude, 53.5);
      expect(step.endLocation.longitude, -7.5);
    });
  });

  group('Integration Tests', () {
    testWidgets('Navigating between tabs works correctly', (WidgetTester tester) async {
      await tester.pumpWidget(const SmartTurnApp());

      await tester.pump(Duration(seconds: 1));
      await tester.pumpAndSettle();


      await tester.tap(find.text('Select on Map'));
      await tester.pumpAndSettle();


      await tester.tap(find.text('Enter Location'));
      await tester.pumpAndSettle();

    });
  });
}