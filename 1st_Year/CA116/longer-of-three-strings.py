#!/usr/bin/env python3

x = str(input())
y = str(input())
z = str(input())
if len(x) > len(y) and len(x) > len(z):
   print(x)
elif len(y) > len(x) and len(y) > len(z):
   print(y)
elif len(z) > len(x) and len(z) > len(y):
   print(z)
