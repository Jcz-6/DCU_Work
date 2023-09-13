#!/usr/bin/env python3

m = 5
i = 0
total = 0
while i < m:
   n = int(input())
   if n == 0:
      total = total
   elif n < 0:
      total = total + (n * -1)
   else:
      total = total + n
   i = i + 1

print(total)
