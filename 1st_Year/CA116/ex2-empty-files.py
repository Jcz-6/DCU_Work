#!/usr/bin/env python3

import sys

j = 0
i = 1
while i < len(sys.argv):
   with open(sys.argv[i]) as f:
      m = f.readline()
      if len(m) == 0:
         print(sys.argv[i])
   i = i + 1
