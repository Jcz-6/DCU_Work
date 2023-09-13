#!/usr/bin/env python3

import sys

from string import punctuation

seen = []
for line in sys.stdin:
   line = line.strip().split()
   new_line = []
   for w in line:
      if w.lower().strip(punctuation) not in seen:
         seen.append(w.lower().strip(punctuation))
         new_line.append(w)
      else:
         new_line.append(".")
   print(" ".join(new_line))
