#!/usr/bin/env python3

import sys

def Process(s):
   for c in s:
      if not c.isalnum():
         s = s.replace(c, "",)
   s = s.upper()
   return s


def Palindrome(x):
   i = 0
   while i < len(x) and x[i] == x[(len(x) - 1 - i)]:
      i = i + 1
   if i == len(x):
      return True
   return False


for line in sys.stdin:
   s = line.strip()
   x = Process(s)
   print(Palindrome(x))
