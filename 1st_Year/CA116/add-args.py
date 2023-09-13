#!/usr/bin/env python3

import sys

args = sys.argv[1:]
i = 0
total = 0

while i < len(args):
   args[i] = int(args[i])
   total = total + args[i]
   i = i + 1

print(total)
