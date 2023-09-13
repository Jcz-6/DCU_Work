#!/usr/bin/env python3


import sys


d = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
     "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten"}

lines = [str(line.strip()) for line in sys.stdin]


def words(s):
   s = s.split()
   num_words = [d[c] for c in s]
   return " ".join(num_words)


for line in lines:
   s = line.strip()
   print(words(s))
