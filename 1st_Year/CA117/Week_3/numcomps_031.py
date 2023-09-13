#!/usr/bin/env python3

import sys


def numcomps(s):
   m3 = [n for n in range(1, int(s) + 1) if n % 3 == 0]
   m4 = [n for n in range(1, int(s) + 1) if n % 4 == 0]
   m3s = [n * n for n in m3]
   m4d = [n * 2 for n in m4]
   m3r4 = [n for n in range(1, int(s) + 1) if n % 3 == 0 or n % 4 == 0]
   m3a4 = [n for n in range(1, int(s) + 1) if n % 3 == 0 and n % 4 == 0]
   print(f'Multiples of 3: {m3}')
   print(f'Multiples of 3 squared: {m3s}')
   print(f'Multiples of 4 doubled: {m4d}')
   print(f'Multiples of 3 or 4: {m3r4}')
   print(f'Multiples of 3 and 4: {m3a4}')


for line in sys.stdin:
   if len(line) > 0:
      s = line.strip()
      numcomps(s)
