#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"
#include "ble.h"

// Does work and fail on incorrect tests
TEST_CASE("Count Check"){
    CHECK(0 == 0);
}


// TEST_CASE("Count fail Check"){
//     CHECK(1 == 0);
// }

TEST_SUITE("BluetoothHandler Tests") {
  TEST_CASE("appendCharToMessage functionality") {
      BluetoothHandler handler;
      
      SUBCASE("Ground case") {
          CHECK(handler.appendCharToMessage("Hel", 'l') == "Hell");
      }
      
      SUBCASE("Empty string?") {
          CHECK(handler.appendCharToMessage("", 'A') == "A");
      }
      
      SUBCASE("Space") {
          CHECK(handler.appendCharToMessage("Test", ' ') == "Test ");
      }
      
      SUBCASE("Numbers") {
          CHECK(handler.appendCharToMessage("123", '4') == "1234");
      }
      
      SUBCASE("Special characters") {
          CHECK(handler.appendCharToMessage("Test", '!') == "Test!");
      }
  }
}

TEST_CASE("Appending characters to HC05 from input to display correctly") {
    BluetoothHandler handler;
    
    CHECK(handler.appendCharToMessage("Hel", 'l') == "Hell");
    
    CHECK(handler.appendCharToMessage("", 'A') == "A");  
    CHECK(handler.appendCharToMessage("Test", ' ') == "Test ");  
    CHECK(handler.appendCharToMessage("123", '4') == "1234"); 
    CHECK(handler.appendCharToMessage("Test", '!') == "Test!"); 
}

TEST_CASE("Random Edge??") {
  BluetoothHandler handler;
  
  CHECK(handler.isMessageComplete(100, 0, 0) == true);  
}


TEST_CASE("Handle timeouts correctly") {
  BluetoothHandler handler;
  
  CHECK(handler.isMessageComplete(1000, 400, 500) == true);
  CHECK(handler.isMessageComplete(850, 400, 500) == false);

}

TEST_CASE("Time difference check") {
  BluetoothHandler handler;
  
  CHECK(handler.isMessageComplete(600, 100, 400) == true);
  CHECK(handler.isMessageComplete(450, 100, 400) == false);

}

TEST_CASE("Connection & PinState Change"){
  BluetoothHandler handler;

  CHECK(handler.isConnected(0) == false);
  CHECK(handler.isConnected(1) == true);
}

TEST_CASE("Message Exists"){
  BluetoothHandler handler;

  CHECK(handler.messageExists("") == false);
  CHECK(handler.messageExists("A") == true);
}