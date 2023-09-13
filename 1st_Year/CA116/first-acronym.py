#!/usr/bin/env python3

s = input()
i = 0

while i < len(s) and not("A" <= s[i] and s[i] <= "Z"):
   i = i + 1

if i < len(s):
   j = i
   while j < len(s) and ("A" <= s[j] and s[j] <= "Z"):
      j = j + 1
   if i == 0:
      print(s[i:j], i)
   elif j < len(s):
      print(s[i:j], i)
