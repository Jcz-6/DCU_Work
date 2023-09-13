#!/usr/bin/env python3

import sys

rooms = sys.stdin.readline().strip()
a_rooms = rooms.split()
f_rooms = len(rooms[1:].split())

if int(rooms[0]) - f_rooms == 0:
   print("no room")

i = 1
while i < int(rooms[0]):
   if str(i) not in a_rooms:
      print(i)
      break
   i = i + 1
