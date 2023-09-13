#!/usr/bin/env python3

import sys

lines = [line.lower().strip() for line in sys.stdin]

d = {"a": 0, "e": 0, "i": 0, "o": 0, "u": 0}
vowels = ["a", "e", "i", "o", "u"]
for line in lines:
   for c in vowels:
      d[c] = d[c] + line.count(c)

sort = sorted(d.items(), key=lambda kv: (kv[1], kv[0]), reverse=True)

maxw = 0
for line in sort:
   if len(str(line[1])) > maxw:
      maxw = len(str(line[1]))

for (k, v) in sort:
   print(f"{k} : {v:>{maxw}}")
