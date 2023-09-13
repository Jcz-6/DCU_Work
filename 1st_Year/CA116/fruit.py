#!/usr/bin/env python3

import sys
words = sys.stdin.readline()
fruit = {
   "apple": True,
   "pear": True,
   "orange": True,
   "banana": True,
   "cherry": True,
}

while 0 < len(words):
   line = words.strip()
   if line in fruit:
      print(line)
   words = sys.stdin.readline()
