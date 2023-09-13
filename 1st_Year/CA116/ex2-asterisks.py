#!/usr/bin/env python3

import sys

lower = "abcdefghijklmnopqrstuvwxyz"
upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
letters = lower + upper
asterisk = {}
i = 0
d = "*"
while i < len(letters):
   if letters[i] not in asterisk:
      asterisk[letters[i]] = d
   i = i + 1

sentence = ""
text = []
j = 0
with open("input.txt") as f:
   m = f.readline().strip()
   while 0 < len(m):
      while j < len(m):
         if m[j] in asterisk:
            sentence = sentence + asterisk[m[j]]
         else:
            sentence = sentence + m[j]
         j = j + 1
      m = f.readline().strip()
      text.append(sentence)
      sentence = ""
      j = 0

with open("output.txt", "w") as g:
   g.write("\n".join(text)))
