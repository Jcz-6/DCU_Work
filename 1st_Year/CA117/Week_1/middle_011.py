#!/usr/bin/env python3

import sys

def middle(s):
   return s[len(s) // 2]


for line in sys.stdin:
   s = line.strip()
   if len(s) % 2 != 0:
      mid = middle(s)
      print(mid)
   else:
      print("No middle character!")
