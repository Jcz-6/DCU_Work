import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hc_05/bluetooth.dart';
import 'package:mockito/mockito.dart';

// Mock Classes
class MockBluetoothManager {
  static MockBluetoothManager? _instance;
  static MockBluetoothManager get instance =>
      _instance ??= MockBluetoothManager();

  bool mockIsConnected = false;
  bool mockConnectResult = true;
  bool mockSendResult = true;
  String lastSentData = '';
  bool hasActiveListener = false;
  MockBleManager? ble;

  bool get isConnected => mockIsConnected;

  // Simulate Connection
  Future<bool> connectToHC05() async {
    mockIsConnected = mockConnectResult;
    return mockConnectResult;
  }

  // Simulate sending data
  Future<bool> sendData(String data) async {
    if (!mockIsConnected) return false;
    lastSentData = data;
    return mockSendResult; // true
  }

  // Simulate recieved data
  Future<bool> receiveData(MockBleManager ble) async {
    if (!mockIsConnected) return false;
    hasActiveListener = true;
    this.ble = ble;
    return true;
  }

  // Simulate recieved data for BLE
  Future<void> simulateDataReceived(String data) async {
    if (!hasActiveListener || ble == null) return;

    switch (data) {
      case 'off':
        await ble!.floraBLE.write([0x30]);
        break;
      case 'left':
        await ble!.floraBLE.write([0x31]);
        break;
      case 'right':
        await ble!.floraBLE.write([0x32]);
        break;
    }
  }

  // Simulate disconnection
  Future<void> disconnect() async {
    mockIsConnected = false;
    hasActiveListener = false;
    ble = null;
  }

  void reset() {
    mockIsConnected = false;
    mockConnectResult = true;
    mockSendResult = true;
    lastSentData = '';
    hasActiveListener = false;
    ble = null;
  }
}

class MockBluetoothCharacteristic {
  List<int> lastWrittenData = [];
  bool throwOnWrite = false;
  String exceptionMessage = '';

  Future<void> write(List<int> data) async {
    if (throwOnWrite) {
      throw PlatformException(
          code: exceptionMessage, message: 'Error writing characteristic');
    }
    lastWrittenData = data;
  }
}

class MockBleManager {
  static MockBleManager? _instance;
  static MockBleManager get instance => _instance ??= MockBleManager();

  bool mockIsConnected = false;
  bool mockConnectResult = true;

  MockBluetoothCharacteristic floraBLE = MockBluetoothCharacteristic();

  Future<bool> connectBLE() async {
    mockIsConnected = mockConnectResult;
    return mockConnectResult;
  }

  void reset() {
    mockIsConnected = false;
    mockConnectResult = true;
    floraBLE = MockBluetoothCharacteristic();
  }
}

class MockBluetoothManagerWithMockito extends Mock
    implements BluetoothManager {}

class MockBleManagerWithMockito extends Mock implements BleManager {}

void main() {
  group('BluetoothManager Basic Tests', () {
    setUp(() {
      MockBluetoothManager.instance.reset();
      MockBleManager.instance.reset();
    });

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
  });

  group('Data Transmission Mock Tests', () {
    test('MockBluetoothManager can simulate sending data', () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockIsConnected = true;
      mockManager.mockSendResult = true;

      String testData = "Test message";
      bool result = await mockManager.sendData(testData);

      expect(result, isTrue);
      expect(mockManager.lastSentData, equals(testData));
    });

    test('BluetoothManager sendData returns false when not connected',
        () async {
      final mockManager = MockBluetoothManager.instance;
      mockManager.mockIsConnected = false;

      String testData = "Test message";
      bool result = await mockManager.sendData(testData);

      expect(result, isFalse);
    });
  });

  group('Command Processing Tests', () {
    test('Correctly processes "off" command', () async {
      final mockManager = MockBluetoothManager.instance;
      final mockBleManager = MockBleManager.instance;

      mockManager.mockIsConnected = true;
      await mockManager.receiveData(mockBleManager);

      await mockManager.simulateDataReceived('off');
      expect(mockBleManager.floraBLE.lastWrittenData, equals([0x30]));
    });

    test('Correctly processes "left" command', () async {
      final mockManager = MockBluetoothManager.instance;
      final mockBleManager = MockBleManager.instance;

      mockManager.mockIsConnected = true;
      await mockManager.receiveData(mockBleManager);

      await mockManager.simulateDataReceived('left');
      expect(mockBleManager.floraBLE.lastWrittenData, equals([0x31]));
    });

    test('Correctly processes "right" command', () async {
      final mockManager = MockBluetoothManager.instance;
      final mockBleManager = MockBleManager.instance;

      mockManager.mockIsConnected = true;
      await mockManager.receiveData(mockBleManager);

      await mockManager.simulateDataReceived('right');
      expect(mockBleManager.floraBLE.lastWrittenData, equals([0x32]));
    });
  });

  // BleManager Tests
  group('BleManager Tests', () {
    test('BleManager is a singleton', () {
      final instance1 = BleManager.instance;
      final instance2 = BleManager.instance;
      expect(identical(instance1, instance2), isTrue);
    });

    test("BleManager is not singleton", (){
      final instance3 = BleManager.instance;
      final instance4 = "";
      expect(identical(instance3, instance4), isFalse);
    });

    test('MockBleManager can simulate successful connection', () async {
      final mockManager = MockBleManager.instance;
      mockManager.mockConnectResult = true;

      bool result = await mockManager.connectBLE();
      expect(result, isTrue);
      expect(mockManager.mockIsConnected, isTrue);
    });

    test('MockBleManager floraBLE can write data correctly', () async {
      final mockManager = MockBleManager.instance;

      List<int> testData = [0x30];
      await mockManager.floraBLE.write(testData);
      expect(mockManager.floraBLE.lastWrittenData, equals(testData));
    });
  });

  // Integration Tests -> Jakub check?
  group('Integration Tests', () {
    test('Connect, Receive data, Process commands', () async {
      final mockManager = MockBluetoothManager.instance;
      final mockBleManager = MockBleManager.instance;

      mockManager.mockConnectResult = true;
      mockBleManager.mockConnectResult = true;

      await mockManager.connectToHC05();
      await mockBleManager.connectBLE();

      expect(mockManager.isConnected, isTrue);
      expect(mockBleManager.mockIsConnected, isTrue);

      await mockManager.receiveData(mockBleManager);
      expect(mockManager.hasActiveListener, isTrue);

      await mockManager.simulateDataReceived('off');
      expect(mockBleManager.floraBLE.lastWrittenData, equals([0x30]));

      await mockManager.disconnect();
      expect(mockManager.isConnected, isFalse);
      expect(mockManager.hasActiveListener, isFalse);
    });
  });
}
