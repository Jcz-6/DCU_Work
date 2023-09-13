#!/usr/bin/env python3

m = 5
n = int(input())
total = 0

while n != 0:
   if n == 0:
      total = total
   elif n < 0:
      total = total + (n * -1)
   else:
      total = total + n
   n = int(input())

print(total)
