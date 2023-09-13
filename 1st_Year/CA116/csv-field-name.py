#!/usr/bin/env python3

import sys
position = int(sys.argv[1])
s = "," + input()

i = 0
j = 0
k = 0
while k < position + 1:
   i = j
   j = i + 1
   while j < len(s) and s[j] != ",":
      j = j + 1
   k = k + 1

print(s[i + 1:j])
