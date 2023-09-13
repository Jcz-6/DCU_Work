#!/usr/bin/env python3

import sys

i = 0
total = 0
liquid = 0
m = sys.stdin.readline().strip()

n = sys.stdin.readline().split()
while i < len(n) and liquid < int(m):
   liquid = liquid + int(n[i])
   total = total + 1
   i = i + 1

if liquid > int(m):
   print(total - 1)
else:
   print(total)
