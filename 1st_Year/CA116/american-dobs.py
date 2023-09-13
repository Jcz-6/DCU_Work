#!/usr/bin/env python3

import sys

with open("american-dobs.txt", "w") as f:
   with open("irish-dobs.txt", "r") as g:
      a = g.readline()
      while 0 < len(a):
         b = a.split("/")
         tmp = b[0]
         b[0] = b[1]
         b[1] = tmp
         c = "/".join(b).strip()
         d = c + "\n"
         f.write(d)
         a = g.readline()
