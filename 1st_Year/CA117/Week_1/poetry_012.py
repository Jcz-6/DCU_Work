#!/usr/bin/env python3

import sys

a = []

for line in sys.stdin:
   s = line.strip()
   a.append(s)

longest = 0
for i in range(len(a)):
   if len(a[i]) > longest:
      longest = len(a[i])

for i in range(len(a)):
   print(f'{a[i]:^{longest}}')
