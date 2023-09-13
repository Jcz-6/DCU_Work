#!/usr/bin/env python3

import sys

dictionary = {}

with open("translation.txt") as f:
   words = f.readline().split()
   while 0 < len(words):
      dictionary[words[0]] = words[1]
      words = f.readline().split()

number = sys.stdin.readline().strip()
while 0 < len(number):
   if number in dictionary:
      print(dictionary[number])
   number = sys.stdin.readline().strip()
