#!/usr/bin/env python3

import sys

lines = [line.strip() for line in sys.stdin]


def count_upper(s):
   for c in s:
      if not c.isupper():
        s = s.replace(c, " ")
   s = s.split()
   max = 0
   word = ""
   for line in s:
      if len(line) > max:
         max = len(line)
         word = line
   return word


for line in lines:
   print(count_upper(line))
