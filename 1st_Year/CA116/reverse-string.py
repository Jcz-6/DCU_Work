#!/usr/bin/env python3

s = input()
i = 0
t = ""

while i < len(s):
   t = t + (s[len(s) - (i + 1)])
   i = i + 1
print(t)
