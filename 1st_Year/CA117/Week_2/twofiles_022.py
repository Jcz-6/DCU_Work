#!/usr/bin/env python3

import sys

a = []
b = []
with open(sys.argv[1], "r") as f:
   for line in f:
      a.append(line.strip())

with open(sys.argv[2], "r") as g:
   for line in g:
      b.append(line.strip())

i = 0
while i < len(a):
   print(a[i])
   print(b[i])
   i = i + 1
