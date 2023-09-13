#!/usr/bin/env python3

import sys

n = 13
lower = "abcdefghijklmnopqrstuvwxyz"
upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

src = lower + upper
dst = lower[n:] + lower[:n] + upper[n:] + upper[:n]

ceasar = {}
i = 0
while i < len(src):
   ceasar[src[i]] = dst[i]
   i = i + 1

text = sys.stdin.read()
sentence = []

j = 0
while j < len(text):
   if text[j] in ceasar:
      sentence.append(ceasar[text[j]])
   else:
      sentence.append(text[j])
   j = j + 1

sys.stdout.write("".join(sentence))
