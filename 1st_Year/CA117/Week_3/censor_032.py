#!/usr/bin/env python3


import sys

with open(sys.argv[1], "r") as f:
   c = f.readlines()

c_words = [line.strip() for line in c]
poem = [line.strip() for line in sys.stdin]

for word in c_words:
   poem = [line.replace(word, "@" * len(word)) for line in poem]

for line in poem:
   print(line)
