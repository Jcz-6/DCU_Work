#!/usr/bin/env python3

s = input()
i = 0
t = 0
while i < len(s):
   x = int(s[i:i + 1])
   t = t + x
   i = i + 1
print(t)
