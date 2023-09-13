#!/usr/bin/env python3

import sys

m = sys.argv[1]
n = sys.argv[2]

total = 0
i = 0
while i < len(m):
   total = total + int(m[i].rstrip())
   i = i + 1

j = 0
total_
while j < len(n):
   total_ = total_ + int(n[j].rstrip())
   j = j + 1

print(total + total_)
