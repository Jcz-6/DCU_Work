#!/usr/bin/env python3

import sys

for line in sys.stdin:
   if int(line) % 400 != 0:
      print((int(line) // 400) + 1)
   else:
      print(int(line) // 400)
