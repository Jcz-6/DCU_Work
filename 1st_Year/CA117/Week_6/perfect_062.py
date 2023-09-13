#!/usr/bin/env python3

import sys


def sum_factors(d):
  deez = [n for n in range(1, (d // 2) + 1) if d % n == 0]
  return deez


def is_perfect(s):
   if xd == line:
      return True
   return False


for line in sys.stdin:
   line = int(line)
   xd = sum(sum_factors(line))
   print(is_perfect(xd))
