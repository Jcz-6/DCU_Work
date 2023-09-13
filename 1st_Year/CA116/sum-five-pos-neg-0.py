#!/usr/bin/env python3

total = 0
sum = 0
n = int(input())
while n != 0:
   if n < 0:
      total = total + n
   elif n > 0:
      sum = sum + n
   n = int(input())

print(total, sum)
