#!/usr/bin/env python3

a = int(input())
b = int(input())
total = 0

if a % 2 == 0 and b == a // 2:
   print("yes")
elif a % 2 == 1 and b == a * 3 + 1:
   print("yes")
else:
   print("no")
