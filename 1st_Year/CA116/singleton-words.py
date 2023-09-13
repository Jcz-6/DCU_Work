#!/usr/bin/env python3

import sys

seen = {}
text = sys.stdin.readline().strip()

while 0 < len(text):
   if text not in seen:
      seen[text] = 1
   else:
      seen[text] = int(seen[text]) + 1
   text = sys.stdin.readline().strip()

for key in seen:
   if seen[key] == 1:
      print(key)
