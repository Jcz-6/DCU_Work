#!/usr/bin/env python3

n = int(input())
if n % 15 == 0:
   print("fizz-buzz")
elif n % 5 == 0:
   print("buzz")
elif n % 3 == 0:
   print("fizz")
elif n % 5 != 0 or n % 3 != 0:
   print(n)
