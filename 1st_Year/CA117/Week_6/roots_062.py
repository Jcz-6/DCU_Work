#!/usr/bin/env python3

import sys
from math import sqrt

def quadratic(s):
   try:
      r1 = float(-s[1] + sqrt((s[1] ** 2) - (4 * s[0] * s[2])))
      r2 = float(-s[1] - sqrt((s[1] ** 2) - (4 * s[0] * s[2])))
      r1 = r1 / (2 * s[0])
      r2 = r2 / (2 * s[0])
      return [r1, r2]
   except ValueError:
      return None


for line in sys.stdin:
   line = line.strip().split()
   line = [int(c) for c in line]
   dn = quadratic(line)
   if dn:
      print(f"r1 = {dn[0]}, r2 = {dn[1]}")
   else:
      print(dn)
