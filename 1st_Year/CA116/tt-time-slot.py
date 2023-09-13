#!/usr/bin/env python3

s = input()
while s != "end":
   tokens = s.split()
   start = int(tokens[1])
   end = (int(tokens[1]) + int(tokens[2]) - 1)
   s = input()
   print(tokens[0], str(start) + ":00", str(end) + ":50", " ".join(tokens[3:]))
