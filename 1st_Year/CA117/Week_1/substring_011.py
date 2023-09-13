#!/usr/bin/env python3

import sys

def capital(s):
   return s.upper()


for line in sys.stdin:
   s = line.strip()
   upper = capital(s).split()
   if upper[0] in upper[1]:
      print("True")
   else:
      print("False")
