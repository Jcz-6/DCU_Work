#!/usr/bin/env python3

i = 0

while i < len(a) and not len(a[i]) >= 6:
   i = i + 1

if i < len(a):
   print(a[i])
