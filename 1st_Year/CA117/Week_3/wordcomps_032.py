#!/usr/bin/env python3

import sys


lines = sys.stdin.readlines()
lines = [line.strip() for line in lines]

lines.sort(key=len)
shortest = [line for line in lines if line.count("a") >= 1 and line.count("e") >= 1 and line.count("i") >= 1 and line.count("o") >= 1 and line.count("u") >= 1]
print(f'Shortest word containing all vowels: {shortest[0]}')

endsw = [line for line in lines if line.lower().endswith("iary")]
print(f'Words ending in iary: {len(endsw)}')

e = 0
for line in lines:
   if line.lower().count("e") > e:
      e = line.lower().count("e")

most_e = [line for line in lines if e == line.lower().count("e")]
print(f"Words with most e's: {most_e}")
