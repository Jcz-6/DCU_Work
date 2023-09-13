#!/usr/bin/env python3

import sys


def single(s):
   if s.count("n") == 1 and s.count("i") == 1 and s.count("c") == 1 and s.count("e") == 1:
      return s


for line in sys.stdin:
   s = line.strip()
   if single(s):
      print(s)
