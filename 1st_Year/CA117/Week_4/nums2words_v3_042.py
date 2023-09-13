#!/usr/bin/env python3


import sys

with open(sys.argv[1], "r") as f:
   trans = [line.strip().split() for line in f]

lines = [str(line.strip()) for line in sys.stdin]


d = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
     "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten"}

p = {}
for line in trans:
   p[line[0]] = line[1]


def eng_to_irs(s):
   s = s.split()
   eng = [d[c] for c in s]
   irs = [p[word] for word in eng]
   return " ".join(irs)


for line in lines:
   s = line.strip()
   print(eng_to_irs(s))
