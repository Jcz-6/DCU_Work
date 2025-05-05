#include "ble.h"

String BluetoothHandler::appendCharToMessage(String currentMessage, char c) {
  return currentMessage + c;
}

bool BluetoothHandler::isMessageComplete(unsigned long currentTime, unsigned long lastTime, int timeout) {
  return (currentTime - lastTime) > timeout;
}

bool BluetoothHandler::isConnected(int pinState){
  if (pinState == 0)
  {
    return false;
  }
  return true;
}

bool BluetoothHandler::messageExists(String newMessage){
  if (newMessage.length() > 0)
  {
    return true;
  }
  return false;
  
}