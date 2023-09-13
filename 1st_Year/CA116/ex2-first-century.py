#!/usr/bin/env python3

import sys

n = sys.stdin.readline().strip()
a = []
while 0 < len(n):
   a.append(n)
   n = sys.stdin.readline().strip()

i = 0
while i < len(a) and int(a[i]) < 100:
   i = i + 1

if i < len(a):
   print(a[i])
else:
   print("none")
