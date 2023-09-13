#!/usr/bin/env python3

n = 10
i = 0
total = 0
y = - 1
while i < n:
   m = int(input())
   if m < 0:
      total = total + (m * -1)
   elif m >= 0:
      total = total + m
   i = i + 1

print(total)
