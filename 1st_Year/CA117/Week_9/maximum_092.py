#!/usr/bin/env python3

import sys

def maximum(a):
   if len(a) == 1:
      return a[0]
   max = a[0]
   rmax = maximum(a[1:])
   if max > rmax:
      return max
   else:
      return rmax
