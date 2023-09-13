#!/usr/bin/env python3

import sys

vowels = "aeiou"
for line in sys.stdin:
   new_line = ""
   i = 0
   while i < len(line):
      if line[i] in vowels:
         i = i + 2
      new_line = new_line + line[i]
      i = i + 1
   print(new_line.strip())
