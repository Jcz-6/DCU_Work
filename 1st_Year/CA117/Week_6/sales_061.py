#!/usr/bin/env python3

import sys

lines = [line.strip().split(":") for line in sys.stdin]

d = {}


def count(s):
   total = 0
   for c in s:
      total = float(total) + float(c)
   total_new = total / len(s)
   return total_new


for line in lines:
   name = line[0]
   sales = (",".join((line[1:]))).strip().split(",")
   d[name] = count(sales)

best = sorted(d.items(), key=lambda item: item[1], reverse=True)

for (k, v) in best:
   print(f"{k}: {v:.2f}")
