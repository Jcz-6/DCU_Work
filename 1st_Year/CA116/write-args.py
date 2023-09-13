#!/usr/bin/env python3

import sys
m = sys.argv[1]

with open(m, "w") as f:
   i = 2
   while i < len(sys.argv):
      t = sys.argv[i]
      f.write(t + "\n")
      i = i + 1
