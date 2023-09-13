#!/usr/bin/env python3

import sys

def times(s):
   numbers = min([float(".".join(line.split(":"))) for line in s if all(c.isdigit() or ":" == c for c in line)])

   return numbers


d = {}
for line in sys.stdin:
   line = line.strip().split()
   names = line[0]
   values = line[1:]
   value = times(values)
   d[names] = value

best = sorted(d.items(), key=lambda item: item[1])
time = ":".join(str(best[0][1]).split("."))
name = best[0][0]
print(f"{name} : {time}")
