#!/usr/bin/env python3

s = input()
i = 0

while i < len(s):
   print("*" * int(s[i:i + 1]))
   i = i + 1
