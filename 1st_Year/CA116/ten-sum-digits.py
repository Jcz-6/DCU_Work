#!/usr/bin/env python3

n = 10
i = 0
total = 0
while i < n:
   m = int(input())
   if m < 0:
      total = total + ((m * -1) % 10)
   else:
      total = total + (m % 10)
   i = i + 1

print(total)
