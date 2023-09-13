#!/usr/bin/env python3

s = input()
i = 0
t = s[(len(s) - i - 1)]
m = s[0]

while i < len(s) - 2:
   t = t + s[(i + 1):(i + 2)]
   i = i + 1
print(t + m)
