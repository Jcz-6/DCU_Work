#!/usr/bin/env python3

s = input()
a = []
i = 0

while s != "end":
   a.append(s)
   s = input()

while i < len(a):
   print(i, len(a), a[i])
   i = i + 1
