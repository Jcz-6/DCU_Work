#!/usr/bin/env python3

s = input()
total = 0

i = 0
while i < len(s):
   if "A" <= s[i] and s[i] <= "Z":
      total = total + 1
   else:
      total = total
   i = i + 1

print(total)
