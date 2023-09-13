#!/usr/bin/env python3

s = input()
total = 0

i = 0
while i < len(s):
   if s[len(s) - (i + 1)] == "1":
      total = total + (2 ** i)
   else:
      total = total
   i = i + 1

print(total)
