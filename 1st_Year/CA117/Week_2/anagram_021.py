#!/usr/bin/env python3

import sys


def anagrams(s):
   [left, right] = s
   d = left
   e = right
   for c in left:
      if c in left and c in right:
         left = left.replace(c, "_", 1)
         right = right.replace(c, "_", 1)
      else:
         return False

   for c in e:
      if c in e and c in d:
         e = e.replace(c, "_", 1)
         d = d.replace(c, "_", 1)
      else:
         return False
   return True


for line in sys.stdin:
   s = line.split()
   if len(s) > 0:
      print(anagrams(s))
