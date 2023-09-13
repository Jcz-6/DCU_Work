#!/usr/bin/env python3

n = 10
i = 0
smallest = int(input())

while i < n - 1:
   m = int(input())
   if m < smallest and m % 2 == 0:
      smallest = m
   i = i + 1

print(smallest)
