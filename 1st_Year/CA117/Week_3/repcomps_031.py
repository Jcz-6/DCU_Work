#!/usr/bin/env python3

import sys


def repcomps(s):
   replaced = [n for n in range(1, int(s) + 1)]
   replaced = ["X" if n % 3 == 0 else n for n in replaced]
   print(f'Multiples of 3 replaced: {replaced}')


for line in sys.stdin:
   s = line.strip()
   repcomps(s)
