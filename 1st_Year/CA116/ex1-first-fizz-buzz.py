#!/usr/bin/env python3

m = int(input())
if m % 3 == 0 and m % 5 == 0:
   print(m)
else:
   i = 0
   while i < m:
      n = int(input())
      if n % 3 == 0 and n % 5 == 0:
         print(n)
         i = m
      i = i + 1
