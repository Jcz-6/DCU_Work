# School of Computing &mdash; Year 4 Project Proposal Form

## SECTION A

|                     |                   |
|---------------------|-------------------|
|Project Title:       | Smart Turn        |
|Student 1 Name:      | Josh Casey        |
|Student 1 ID:        | 21361783          |
|Student 2 Name:      | Jakub Czerniejewski|
|Student 2 ID:        | 21466494          |
|Project Supervisor:  |  David Sinclair           |


## SECTION B

### Introduction

> Our project is an IoT device that is connected to a mobile phone application via Bluetooth that uses GPS(Open Street Maps/Flutter Map Package) to display distance and direction for the user on a small LCD screen which will be controlled by a Arduino UNO, the screen will display the direction the user should take next and the distance till the next turn. Our project also includes a smart gesture button to start a turn signal. Once the turn signal is activated the UNO will communicate with the clothing mounted microcontroller (ADA Flora) which has two LED clusters of an arrow shape attached to it. The correct side arrow will light up based on user input which notifies other road users of where the cyclist/scooter user is intending to turn.

### Outline

> At the final stages of our project we hope to have developed a well designed system consisting of 2 IoT devices and an app to provide cyclists with a safe and convenient way to travel from place to place.

> ### Main Aspects:
>Wearable vest containing LEDs for indication
Arduino UNO connected to a mobile app and ADA Flora while displaying direction on a screen.
ADA Flora, Arduino UNO and mobile application all communicate effectively and efficiently via bluetooth.


### Background

> The project originates from the desire to assist cyclists and scooter users by reducing the need for hand signals when turning, which can be unsafe and distracting. By leveraging embedded software and low-level programming, we aim to create a system that improves cycling safety by providing user controlled turn signals and GPS-based navigation.

>Our project taps into our passion for IoT, low-level microcontroller programming, and wearable technology to address the common safety concerns of road users.



### Achievements

> #### Hands-Free Turn Signaling:
>The system automates turn signals via a wearable vest embedded with addressable LEDs. Cyclists can activate the turn signal using gesture controls or a haptic button mounted on the bike's handlebars, eliminating the need for traditional hand signals.
The system may also incorporate an accelerometer to automatically turn off the signal when the handlebars straighten after a turn, further simplifying the process for the cyclist.

> #### Real-Time GPS Navigation:
>The project will integrate GPS navigation displayed on a small LCD screen mounted on the handlebars. The display will provide real-time directions and distance to the next turn, sourced from Open Street Maps (using the Flutter Map Package).
This ensures that cyclists receive clear navigation guidance without needing to take out or check their phones, helping them keep their attention on the road.

> #### Bluetooth Communication:
>Seamless Bluetooth communication between the mobile app, Arduino UNO, and Adafruit Flora microcontrollers will enable the system to function as an integrated whole.
The mobile app will communicate navigation instructions, while the Adafruit Flora handles the LED signaling on the vest, ensuring both the screen and the LEDs are synced with the route and cyclist's actions.

> #### Gesture Control for Turn Signals:

> A touch sensor or MPR121 sensor will allow the user to swipe or tap to activate the turn signals, providing a more intuitive, user-friendly method to control the lights without additional buttons or complexity.

> #### Battery-Powered, Wearable System:
>The vest will be lightweight and powered by rechargeable Li-ion batteries, making it convenient for cyclists to wear without worrying about frequent battery replacements. The vest and display will use power-efficient components to maximize battery life during longer rides.

> ### Who Will the Users Be?

> #### Big City Cyclists:

> The primary users will be everyday cyclists who commute in busy urban environments. These users need reliable, hands-free navigation and turn signaling to improve their safety on the road.
The system helps reduce the risks of phone theft and distraction while navigating dense city traffic, offering a safer alternative to using phones for directions.

> #### Scooter Riders:

>Similar to cyclists, scooter riders will benefit from the Smart Turn system. Electric scooter riders, who often navigate the same streets as cyclists, can use the wearable turn signals and onboard navigation to travel safely without needing to gesture or check a phone.



### Justification

> The Smart Turn project will be useful in several key situations, specifically targeting big city cyclists and scooter users:

>**Why:** The system provides a safer and more convenient way for cyclists to signal turns and follow GPS directions without the need for manual gestures or checking a phone. This reduces distractions and helps cyclists keep their hands on the handlebars, improving overall road safety. Additionally, by not exposing a phone for navigation, cyclists can mitigate the risk of phone theft, which can be a common issue in major cities.

>**When:** It will be most useful during daily commutes or any situation in generall where cyclists need to navigate traffic or follow specific routes. Whether commuting to work, exploring a new city, or travelling through new busy urban areas, our system helps turn signalling and navigation without interrupting the ride.

>**Where:** This system is especially valuable in cities, where there is higher traffic density and more risk from distracted or unpredictable road users. In cities where phone theft is prevalent, keeping the phone out of sight is a significant benefit for riders. The device is also useful in low-visibility conditions like dusk or rain, where hand signals might be difficult for other road users to see.

>**How:** By combining Bluetooth IoT devices with LED's, gesture control, GPS navigation and a flutter application the system offers cyclists a more integrated and hands-free experience.  This integration ensures a seamless experience for riders, making it easier to navigate and signal turns without unnecessary distractions or safety risks.

### Programming language(s)

>- **C/C++**
>- **Dart**

### Programming tools / Tech stack

>- Bluetooth Serial Protocol
>- Flutter (Mobile app development framework)
>- Dart (Programming language for Flutter)
>- Bluetooth Testing: nRF Connect, Serial Bluetooth Terminal 
>- Flutter Geolocator (Location services for Flutter)
>- Tinkercad (Simulation software for electronics)
>- GitLab
>- Jenkins (CI/CD pipeline)

### Hardware

> #### Front Assembly - Display and Sensors:
>- Arduino UNO
>- HC-05 Wireless Bluetooth RF Transceiver
>- IPS Display (for navigation and distance)
>- MPR121 Touch Sensor (for gesture control)
>- 9V Rechargable Batteries
>- Breadboards
> #### Rear Assembly Vest Indicators:
>- Adafruit Flora
>- Adafruit Bluefruit LE UART Friend - Bluetooth Low Energy (BLE)
>- Flora Neopixels / WS2812B (Addressable LEDs for turn signals)
>- Li-Ion battery
>- USB battery charger


### Learning Challenges

>- Flutter: Mobile app development framework that uses the Dart programming language we are unfamiliar with both Flutter and Dart.
>- Arduino IDE: Used to program IoT devices using C/C++ which is a new language for us and an area of CS we have not covered.
>- Peripherals: Connecting to and accessing interfaces of multiple peripherals from our Arduino/Flora.
>- Bluetooth Low Energy (BLE): Implementing and managing Bluetooth communication between a mobile phone and our IoT devices.
>- Jenkins: CI/CD pipeline software for managing our git workflow

### Breakdown of work


#### Student 1

> The creation of the flutter application that connects to the Arduino UNO and Flora via bluetooth, setting up bluetooth communication between the arduino and phone app. Configuring of the LEDs to the electronics and battery mounted onto the vest and programming them.

#### Student 2

> Program the front UNO assembly which is responsible for the screen and touch sensor integration and sending information over bluetooth to the rear FLORA assembly.

#### Shared

> Testing and Hardware Wiring. 

