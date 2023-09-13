#!/usr/bin/env python3

import sys

import string

punc = string.punctuation
a = []

def process(s):
   for c in s:
      if c in punc:
         s = s.replace(c, "", 1)
   s = s.upper()
   s = s.split()

   for i in range(len(s)):
      if s[i] not in a:
         a.append(s[i])
   return a


for line in sys.stdin:
   s = line.strip()
   x = process(s)

print(len(x))
