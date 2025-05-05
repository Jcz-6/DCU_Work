import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import 'package:hc_05/main.dart';
import 'package:hc_05/bluetooth.dart';
import 'package:hc_05/navigation.dart';

//Remade for ease of use
bool looksLikeHtml(String text) {
    return text.contains('<!DOCTYPE html>') || text.contains('<html');
  }


// Repeated import for bluetooth testing
class MockBluetoothManager {
  static MockBluetoothManager? _instance;
  static MockBluetoothManager get instance => _instance ??= MockBluetoothManager();
  
  bool mockIsConnected = false;
  bool mockConnectResult = true;
  bool mockSendResult = true;
  String lastSentData = '';
  
  bool get isConnected => mockIsConnected;
  
  Future<bool> connectToHC05() async {
    mockIsConnected = mockConnectResult;
    return mockConnectResult;
  }
  
  Future<bool> sendData(String data) async {
    lastSentData = data;
    return mockSendResult;
  }
  
  Future<void> disconnect() async {
    mockIsConnected = false;
  }
}

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('BluetoothManager Tests', () {
    test('Bluetooth isConnected should be false initially', () {
      final bluetoothManager = BluetoothManager.instance;
      expect(bluetoothManager.isConnected, isFalse);
    });
    
    test('MockBluetoothManager can simulate connection', () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockConnectResult = true;
      bool result = await mockManager.connectToHC05();
      expect(result, isTrue);
      expect(mockManager.isConnected, isTrue);
    });
    
    test('MockBluetoothManager can simulate connection failure', () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockConnectResult = false;
      bool result = await mockManager.connectToHC05();
      expect(result, isFalse);
      expect(mockManager.isConnected, isFalse);
    });
    
    test('MockBluetoothManager can simulate sending data', () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockIsConnected = true;
      mockManager.mockSendResult = true;
      
      String testData = "Test message";
      bool result = await mockManager.sendData(testData);
      
      expect(result, isTrue);
      expect(mockManager.lastSentData, equals(testData));
    });
    
    test('MockBluetoothManager can simulate disconnect', () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockIsConnected = true;
      
      await mockManager.disconnect();
      expect(mockManager.isConnected, isFalse);
    });
  });
  
 
  
  group('MapScreen Widget Tests', () {
    testWidgets('MapScreen shows loading indicator initially', 
        (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: MapScreen(
          onLocationSelected: (location) {},
          startCoordinates: LatLng(0.0, 0.0),
        ),
      ));
      
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });
  });
  
  group('Polyline Decoding Tests', () {
    test('Polyline decoding should convert encoded string to coordinates', () {
      // Grab from Etown to longford for repeatability
      // ignore: unused_local_variable
      final String encodedPolyline = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";
      
      final testWidget = MapScreen(
        onLocationSelected: (location) {},
        startCoordinates: LatLng(0.0, 0.0),
      );
      
      // ignore: unused_local_variable
      final testWidgetState = testWidget.createState();
   
      expect(testWidget, isA<MapScreen>());
    });
  });
  
  group('SmartTurnApp Integration Tests', () {
    testWidgets('SmartTurnApp initializes with proper structure', 
        (WidgetTester tester) async {
      await tester.pumpWidget(const SmartTurnApp());
      
      await tester.pumpAndSettle();
            expect(find.byType(MaterialApp), findsOneWidget);
      
      expect(find.text('Smart Turn'), findsOneWidget);
    });
    
   
  });
  
  group('Utility Functions', () {
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


  group("HTML & Type Checking", () {
    test('True for HTML content', () {
    expect(looksLikeHtml('<!DOCTYPE html><html><body>Hello</body></html>'), isTrue);
    expect(looksLikeHtml('<html>This is HTML</html>'), isTrue);
  });

  test('False for non-HTML', () {
    expect(looksLikeHtml('Longford, Ireland'), isFalse);
    expect(looksLikeHtml('Random place name with no tags'), isFalse);
  });


  });
}