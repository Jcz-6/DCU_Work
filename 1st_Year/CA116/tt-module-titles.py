#!/usr/bin/env python3

s = input()
while s != "end":
   tokens = s.split()
   x = tokens[5:]
   print(" ".join(x))
   s = input()
