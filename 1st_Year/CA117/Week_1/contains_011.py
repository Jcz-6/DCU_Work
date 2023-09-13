#!/usr/bin/env python3

import sys

def upper(s):
   return s.upper()


for line in sys.stdin:
   s = line.strip()
   capital = upper(s).split()
   if capital[0] in capital[1]:
      print("True")
   else:
      print("False")
