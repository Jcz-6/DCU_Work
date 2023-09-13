#!/usr/bin/env python3

import sys

def minimum(a):
   if len(a) == 1:
      return a[0]
   min = a[0]
   rmin = minimum(a[1:])
   if min < rmin:
      return min
   else:
      return rmin
