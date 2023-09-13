#!/usr/bin/env python3

x = int(input())
y = int(input())
z = int(input())
a = int(input())
b = int(input())
c = int(input())
if (a - x) < z and (a - x) < c and (b - y) < z and (b - y) < c:
   print("yes")
else:
   print("no")
