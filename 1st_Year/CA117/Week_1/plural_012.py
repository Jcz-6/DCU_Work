#!/usr/bin/env python 3

import sys


a = ["ch", "x", "z", "s", "sh", "o"]
b = ["f", "fe"]
c = ["b", "c", "d", "f", "g", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


def plural(s):
   word = s + "s"
   for i in range(len(a)):
      if s.endswith(a[i]):
         word = s + "es"

   for i in range(len(c)):
      if s.endswith("y") and s[-2] == c[i]:
         word = s[:-1] + "ies"

   for i in range(len(b)):
      if s.endswith(b[i]) and len(b[i]) == 2:
         word = s[:-2] + "ves"
      elif s.endswith(b[i]):
         word = s[:-1] + "ves"
   return word


for line in sys.stdin:
   s = line.strip()
   print(plural(s))
