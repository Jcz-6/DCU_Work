#!/usr/bin/env python3

n = int(input())
i = 0
x = i
print(i)
while i < n - 1:
   x = x - x * 2 + ((x % 2) * 2 - 1)
   print(x)
   i = i + 1
