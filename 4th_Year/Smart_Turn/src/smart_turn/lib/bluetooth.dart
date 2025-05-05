import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart' as bl1;
import 'package:flutter_blue_plus/flutter_blue_plus.dart' as bl2;

/// Singleton class for managing Bluetooth connection
/// and communication to the HC05 Device
class BluetoothManager {
  BluetoothManager._();
  static BluetoothManager? _instance;
  static BluetoothManager get instance => _instance ??= BluetoothManager._();

  // ignore: unused_field
  bl1.BluetoothDevice? _device;
  bl1.BluetoothConnection? _connection;
  bool get isConnected => _connection?.isConnected ?? false;

  // Address to HC05 Bluetooth Module
  static const String hc05Address = "00:22:12:01:B3:B1";

  // Connect to the HC05 resolving to true if successfull
  Future<bool> connectToHC05() async {
    try {
      _connection = await bl1.BluetoothConnection.toAddress(hc05Address);
      return true;
    } catch (e) {
      debugPrint('Error connecting to HC-05: $e');
      return false;
    }
  }

  // Sends data in bits to Bluetooth module
  Future<bool> sendData(String data) async {
    try {
      if (!isConnected) {
        throw Exception('Not connected to HC-05');
      }
      Uint8List bytes = Uint8List.fromList(utf8.encode(data));
      _connection?.output.add(bytes);
      await _connection?.output.allSent;
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<bool> receiveData(BleManager ble) async {
    try {
      if (!isConnected) {
        throw Exception('Not connected to HC-05');
      }
      _connection?.input?.listen((Uint8List data) async {
        debugPrint('Data comming in: ${ascii.decode(data)}');
        String decodedData = ascii.decode(data);
        switch (decodedData) {
          case 'off':
            await ble.floraBLE.write([0x30]);
            break;
          case 'left':
            await ble.floraBLE.write([0x31]);
            break;
          case 'right':
            await ble.floraBLE.write([0x32]);
            break;
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  // Disconnect function to allow for device reconnection if needed
  Future<void> disconnect() async {
    try {
      await _connection?.close();
      _connection = null;
      _device = null;
    } catch (e) {
      debugPrint('Error disconnecting: $e');
    }
  }
}

class BleManager {
  BleManager._();
  static BleManager? _instance;
  static BleManager get instance => _instance ??= BleManager._();

  var device = bl2.BluetoothDevice.fromId('CD:CF:69:3C:21:3C');

  late bl2.BluetoothCharacteristic floraBLE;

  Future<bool> connectBLE() async {
    // ignore: unused_local_variable
    var _subscriptionState = bl2.FlutterBluePlus.adapterState.listen(
        (bl2.BluetoothAdapterState state) async {

      if (state == bl2.BluetoothAdapterState.on) {
        await bl2.FlutterBluePlus.startScan(
          timeout: Duration(seconds: 5),
          withRemoteIds: ['CD:CF:69:3C:21:3C'],
          withNames: [
            "Adafruit Bluefruit LE"
          ], // Filter by device name (optional)
        );

        await device.connect(mtu: 512, timeout: Duration(seconds: 100));

        device.connectionState
            .listen((bl2.BluetoothConnectionState state) async {
          if (state == bl2.BluetoothConnectionState.connected) {

            List<bl2.BluetoothService> services =
                await device.discoverServices();

            for (bl2.BluetoothService service in services) {
              List<bl2.BluetoothCharacteristic> characteristics =
                  service.characteristics;
              for (bl2.BluetoothCharacteristic characteristic
                  in characteristics) {
                // Access characteristic properties (UUID, value, etc.)
                debugPrint(characteristic.toString());
              }
            }

            var byteSeviceUuid =
                bl2.Guid.fromString("6e400001-b5a3-f393-e0a9-e50e24dcca9e");

            var byteCharacteristicUuid =
                bl2.Guid.fromString("6e400002-b5a3-f393-e0a9-e50e24dcca9e");

            var flora = bl2.BluetoothCharacteristic(
                remoteId: device.remoteId,
                serviceUuid: byteSeviceUuid,
                characteristicUuid: byteCharacteristicUuid);

            floraBLE = flora;

            // Proceed with discovering services\
          } else if (state == bl2.BluetoothConnectionState.disconnected) {
          }
        });
      }
    }, onError: (e) => debugPrint(e));

    return true;
  }
}
