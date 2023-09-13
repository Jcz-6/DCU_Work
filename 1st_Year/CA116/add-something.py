#!/usr/bin/env python3

s = input()
a = []

while s != "end":
   if s != "end":
      s = int(s)
      a.append(s)
      s = input()

m = int(input())
i = 0

while i < len(a):
   print(a[i] + m)
   i = i + 1
