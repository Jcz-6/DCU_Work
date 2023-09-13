#!/usr/bin/env python3

import sys

def reverse_list(a):
   if len(a) == 1:
      return [a[0]]
   if len(a) == 0:
      return []
   return [a[-1]] + reverse_list(a[:-1])
