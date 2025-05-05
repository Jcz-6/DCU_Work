#ifndef BLUETOOTH_HANDLER_H
#define BLUETOOTH_HANDLER_H

#ifdef UNIT_TEST
  #include <string>
  using String = std::string;
#else
  #include <Arduino.h>
#endif

class BluetoothHandler {
  public:
    String appendCharToMessage(String currentMessage, char c);
    bool isMessageComplete(unsigned long currentTime, unsigned long lastTime, int timeout);
    bool isConnected(int statePin);
    bool messageExists(String newMessage);
};

#endif
