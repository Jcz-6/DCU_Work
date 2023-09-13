#!/usr/bin/env python3

import sys

cards = [line.strip() for line in sys.stdin]


def poker(s):
   s = s.split()
   max = 0
   for c in s:
      s = "".join(s)
      if s.count(c[0]) >= max:
         max = s.count(c[0])
   return max


for line in cards:
   print(poker(line))
