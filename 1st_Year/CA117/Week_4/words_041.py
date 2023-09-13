#!/usr/bin/env python3

import sys
import string
lines = [line.lower().strip().strip(string.punctuation) for line in sys.stdin]
lines = " ".join(lines)
lines = lines.split()
lines = [line.replace(".", "") if line.endswith(".") else line for line in lines]

u_words = {}

for line in lines:
   if line not in u_words:
      u_words[line] = 1
   else:
      u_words[line] = u_words[line] + 1

sort = sorted(u_words.items())
for line in sort:
   print(f"{line[0]} : {line[1]}")
