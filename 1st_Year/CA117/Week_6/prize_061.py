#!/usr/bin/env python3

import sys

start = sys.stdin.readline().strip()

letters = sys.stdin.readline().strip()


def swap(start):
   order = ["1", "2", "3"]
   s = start
   for c in letters:
      if c == "A":
         x = order[1]
         order[1] = order[0]
         order[0] = x
      if c == "B":
         x = order[2]
         order[2] = order[1]
         order[1] = x
      if c == "C":
         x = order[2]
         order[2] = order[0]
         order[0] = x
   return order.index(s) + 1


print(swap(start))
