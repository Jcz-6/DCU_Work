#!/usr/bin/env python3

import sys


def unique(s):
   uni = [line for line in s if s.count(line) == 1]
   if len(uni) > 0:
      return max(uni)
   else:
      return "none"


for line in sys.stdin:
   s = line.strip().split()
   print(unique(s))
