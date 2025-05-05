#include <SoftwareSerial.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Wire.h>
#include "Adafruit_MPR121.h"

// Display
#define TFT_CS 10
#define TFT_RST 7
#define TFT_DC 6

// HC-05 Bluetooth
#define RX_PIN 9
#define TX_PIN 8
#define STATE_PIN 4

#ifndef _BV
#define _BV(bit) (1 << (bit))
#endif

// Declare display and Bluetooth serial ports
Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);
Adafruit_MPR121 cap = Adafruit_MPR121();
SoftwareSerial bluetoothSerial(RX_PIN, TX_PIN);

bool lastState = false;
String receivedMessage = "";
unsigned long lastReceivedTime = 0;
const int messageTimeout = 125;

// Main initialization set up for arduino
void setup()
{
  bluetoothSerial.begin(9600);

  pinMode(STATE_PIN, INPUT);

  delay(1000);

  if (!cap.begin(0x5A))
  {
    Serial.println("MPR121 not found, check wiring?");
    while (1)
      ;
  }
  Serial.println("MPR121 found!");

  // Initialize display
  tft.init(170, 320);
  tft.setRotation(3);
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_BLUE);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("Smart Turn");
  tft.setTextColor(ST77XX_WHITE);
}

// Main loop for reading in recieved data
void loop()
{
  // Get the currently touched pads
  if (cap.touched() & (1 << 11))
  {
    bluetoothSerial.write("left");

    tft.fillRect(210, 35, 100, 100, ST77XX_BLACK);
    tft.fillRect(260, 60, 40, 30, ST77XX_GREEN);
    tft.fillTriangle(270, 115, 270, 35, 210, 75, ST77XX_GREEN);
    delay(350);
  }
  if (cap.touched() & (1 << 5))
  {
    bluetoothSerial.write("off");
    tft.fillRect(210, 35, 100, 100, ST77XX_BLACK);
    delay(350);
  }
  if (cap.touched() & (1 << 0))
  {
    bluetoothSerial.write("right");
    tft.fillRect(210, 35, 100, 100, ST77XX_BLACK);
    tft.fillRect(210, 60, 50, 30, ST77XX_GREEN);
    tft.fillTriangle(240, 115, 240, 35, 295, 75, ST77XX_GREEN);
    delay(350);
  }

  bool currentState = digitalRead(STATE_PIN);

  if (currentState != lastState)
  {
    tft.fillRect(0, 30, 190, 40, ST77XX_BLACK);
    tft.fillRect(0, 140, 300, 300, ST77XX_BLACK);
    tft.fillRect(210, 35, 100, 100, ST77XX_BLACK);
    tft.setCursor(10, 40);

    // If a change in state occurs update the display
    if (currentState == HIGH)
    {
      Serial.println("Device Connected");
      tft.println("Connected");
      tft.fillCircle(150, 45, 10, ST77XX_GREEN);
    }
    else
    {
      Serial.println("Device Disconnected");
      tft.println("Disconnected");
      tft.fillCircle(170, 45, 10, ST77XX_RED);
    }
    lastState = currentState;
  }

  // Read incoming Bluetooth data
  while (bluetoothSerial.available())
  {
    char c = bluetoothSerial.read();
    receivedMessage += c;
    lastReceivedTime = millis();
  }

  // If no new characters have been received assume message is complete
  if (receivedMessage.length() > 0 && millis() - lastReceivedTime > messageTimeout)
  {
    // Clear previous text area
    tft.fillRect(0, 140, 300, 300, ST77XX_BLACK);
    tft.setCursor(0, 140);
    tft.print(receivedMessage);

    receivedMessage = "";
  }
}
