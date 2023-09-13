#!/usr/bin/env python3

import sys


def nice(s):
   if s.count("n") == 1 and s.count("i") == 1 and s.count("c") == 1 and s.count("e") == 1:
      if s.index("n") < s.index("i") and s.index("i") < s.index("c") and s.index("c") < s.index("e"):
         return s


for line in sys.stdin:
   s = line.strip()
   if nice(s):
      print(s)
