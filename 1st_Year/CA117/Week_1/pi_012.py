#!/usr/bin/env python3

import sys

from math import pi

g = sys.stdin.readline().strip()

while 0 < len(g):
   print(f'{pi:.{g}f}')
   g = sys.stdin.readline().strip()
