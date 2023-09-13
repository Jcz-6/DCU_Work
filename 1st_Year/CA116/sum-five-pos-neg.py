#!/usr/bin/env python3

m = 5
i = 0
total = 0
sum = 0

while i < m:
   n = int(input())
   if n <= 0:
      total = total + n
   elif n >= 0:
      sum = sum + n
   i = i + 1

print(total, sum)
