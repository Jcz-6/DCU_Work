#!/usr/bin/env python3

import sys


def name(s):
   i = 0
   while "a" <= x[1][i] and x[1][i] <= "z":
      i = i + 1
   return x[0].capitalize() + " " + x[1][:i].capitalize()


for line in sys.stdin:
   s = line.strip()
   x = s.split(".")
   print(name(x))
