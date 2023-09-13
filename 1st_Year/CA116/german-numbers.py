#!/usr/bin/env python3

import sys

n = sys.stdin.readline()

english = "one two three four five six seven eight nine ten".split()
german = "eins zwei drei vier funf sechs sieben acht neun zehn".split()
i = 0
translation = {}
while i < 10:
   translation[english[i]] = german[i]
   i = i + 1

while 0 < len(n):
   number = n.strip()
   if number in translation:
      print(translation[number])
   n = sys.stdin.readline()
