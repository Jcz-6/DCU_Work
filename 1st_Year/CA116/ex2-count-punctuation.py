#!/usr/bin/env python3

import sys
s = sys.stdin.readlines()

total = 0
i = 0
j = 0
while i < len(s):
   while j < len(s[i]):
      m = s[i].strip()
      if s[i][j] == ".":
         total = total + 1
      elif s[i][j] == ",":
         total = total + 1
      elif s[i][j] == "!":
         total = total + 1
      elif s[i][j] == "?":
         total = total + 1
      elif s[i][j] == ";":
         total = total + 1
      elif s[i][j] == ":":
         total = total + 1
      j = j + 1
   j = 0
   i = i + 1
print(total)
