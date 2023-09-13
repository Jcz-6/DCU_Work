#!/usr/bin/env python3

s = input()
i = 0
if s[i:(i + 1)] == " ":
   t = ""
else:
   t = s[i:(i + 1)]
while i < len(s):
   if s[(i + 1):(i + 2)] == " ":
      t = t + ""
   else:
      t = t + (s[(i + 1):(i + 2)])
   i = i + 1

print(t)
