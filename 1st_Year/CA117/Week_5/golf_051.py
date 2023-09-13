#!/usr/bin/env python3

import sys

lines = [line.strip() for line in sys.stdin]


def count(s):
   total = 0
   for n in s:
      total = total + int(n)
   return total


players = {}
disq = []
for line in lines:
   points = line[-6:].split()
   names = line[:-6]
   if all(n.isdigit() for n in points):
      players[names] = count(points)
   else:
      disq.append(names)

order = sorted(players.items(), key=lambda item: item[1])

for line in order:
   print(f"{line[0]}: {line[1]}")

if len(disq) > 0:
   print("Disqualified: " + ", ".join(disq))
