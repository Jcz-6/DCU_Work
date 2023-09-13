#!/usr/bin/env python3

s = input()
while s != "end":
   tokens = s.split()
   if int(tokens[2]) > 1:
      print(" ".join(tokens))
   s = input()
