#!/usr/bin/env python3

import sys

i = 1
total = 0

while i < len(sys.argv):
   with open(sys.argv[i]) as f:
      g = f.readline()
      while g != "":
         a = g.split()
         j = 0
         while j < len(a):
            total = total + int(a[j])
            j = j + 1
         g = f.readline()
   i = i + 1
print(total)
