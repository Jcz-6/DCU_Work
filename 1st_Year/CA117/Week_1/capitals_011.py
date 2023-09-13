#!/usr/bin/env python3

import sys

def chop(s):
   return s[0].upper() + s[1:-1] + s[len(s) - 1].upper()


for line in sys.stdin:
   s = line.strip()
   if len(s) > 1:
      chopped = chop(s)
      print(chopped)
