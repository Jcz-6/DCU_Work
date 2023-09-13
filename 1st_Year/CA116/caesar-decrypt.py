#!/usr/bin/env python3

import sys

n = 13
lower = "abcdefghijklmnopqrstuvwxyz"
upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

dst = lower + upper
src = lower[n:] + lower[:n] + upper[n:] + upper[:n]

ceasar = {}
i = 0
while i < len(src):
   ceasar[src[i]] = dst[i]
   i = i + 1

output = []

i = 0
text = sys.stdin.read()
while i < len(text):
   if text[i] in ceasar:
      output.append(ceasar[text[i]])
   else:
      output.append(text[i])
   i = i + 1
sys.stdout.write("".join(output))
