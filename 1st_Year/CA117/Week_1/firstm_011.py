#!/usr/bin/env python3

import sys


def fm(s):
   i = 0
   while i < len(s) and s[i] != "m":
      i = i + 1
   if "m" in s:
      return s[:i] + "M" + s[i + 1:]
   else:
      return(s)


for line in sys.stdin:
   s = line.strip()
   if s != "":
      print(fm(s))
