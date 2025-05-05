// Libary used to control NeoPixels
#include <Adafruit_NeoPixel.h>
// Libaries used for Arduino IDE
#include <Arduino.h>
#include <SPI.h>
// Libaries used for Bluetooth
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_UART.h"

#define BLUEFRUIT_UART_MODE_PIN -1      // Set to -1 if MODE Pin unused
#define BLUEFRUIT_HWSERIAL_NAME Serial1 // Have to give the hardware serial a name

// Initialize ble module
Adafruit_BluefruitLE_UART ble(BLUEFRUIT_HWSERIAL_NAME, BLUEFRUIT_UART_MODE_PIN);

// Pins used for singal to NeoPixel chain
#define RIGHT_SIGNAL_LED 6
#define LEFT_SIGNAL_LED 10

// Both turn signals are composed of 10 LED's
#define LED_COUNT 10

// LED brightness
#define BRIGHTNESS 60

// Left and Right Turn signal defintions
Adafruit_NeoPixel RightSignal(LED_COUNT, RIGHT_SIGNAL_LED, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel LeftSignal(LED_COUNT, LEFT_SIGNAL_LED, NEO_GRB + NEO_KHZ800);

// Flora built in LED used to show if bluetooth if connected or not, turns Blue when a message is passed to it.
Adafruit_NeoPixel FloraLight(1, 8, NEO_GRB + NEO_KHZ800);

// Used to keep track of which turn signal to turn on
int turnSignalId = 0;
// Flag for ble connection
int bleConnected = 0;

void setup()
{
  RightSignal.begin();                   // INITIALIZE NeoPixel strip object (REQUIRED)
  RightSignal.show();                    // Turn OFF all pixels ASAP
  RightSignal.setBrightness(BRIGHTNESS); // Set Brightness
  LeftSignal.begin();
  LeftSignal.show();
  LeftSignal.setBrightness(BRIGHTNESS);
  FloraLight.begin();
  FloraLight.show();
  FloraLight.setBrightness(25);

  // Start the ble process at a Baud Rate of 9600
  ble.begin(9600);
}

void loop()
{

  // Turn Flora LED Blue if connected otherwise make it Red
  if (bleConnected == 1)
  {
    FloraLight.setPixelColor(0, 0, 0, 255);
    FloraLight.show();
  }
  else
  {
    FloraLight.setPixelColor(0, 255, 0, 0);
    FloraLight.show();
  }

  // Check if a bluetooth connection is available
  // Read value and run through case switch
  if (ble.available())
  {
    int res = ble.read();

    switch (res)
    {
    case '0':
    {
      turnSignalId = 0; // Turn off any turn signal running
      bleConnected = 1; // Change bluetooth flag
      break;
    }
    case '1':
    {
      turnSignalId = 1;   // Turn on left turn signal
      RightSignal.show(); // Turn off right turn signal
      bleConnected = 1;
      break;
    }
    case '2':
    {
      turnSignalId = 2;  // Turn on right turn signal
      LeftSignal.show(); // Turn off left turn signal
      bleConnected = 1;
      break;
    }
    }
  }
  if (turnSignalId == 1)
  {
    showColours(LeftSignal.Color(255, 85, 0), 75, 1); // Add turn singal orange with 75 delay so it stays orange for a bit say its turn signal 1 (Left)
    showColours(LeftSignal.Color(0, 0, 0), 10, 1);    // Add blank colour (turn off) with 10 delay so it turns off quickly
  }
  else if (turnSignalId == 2)
  {
    showColours(RightSignal.Color(255, 85, 0), 75, 2); // Add turn singal orange with 75 delay so it stays orange for a bit say its turn signal 2 (Right)
    showColours(RightSignal.Color(0, 0, 0), 10, 2);    // Add blank colour (turn off) with 10 delay so it turns off quickly
  }
}

void showColours(uint32_t color, int wait, int turnSignalId)
{
  for (int i = 0; i < LED_COUNT; i++)
  { // For each pixel in strip
    if (turnSignalId == 1)
    {
      LeftSignal.setPixelColor(i, color); //  Set pixel's color (in RAM)
      LeftSignal.show();                  // Display the colour
      delay(wait);                        // Use the delay to make it light up for a while
    }
    else
    {
      RightSignal.setPixelColor(i, color); //  Set pixel's color (in RAM)
      RightSignal.show();                  //  Display the colour
      delay(wait);
    }
  }
}
