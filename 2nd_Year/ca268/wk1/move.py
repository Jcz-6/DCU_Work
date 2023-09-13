#!/usr/bin/env python3

def move_vow(line):
   vowels = "aeiouAEIOU"
   v = []
   c = []
   for s in line:
      if s in vowels:
         v.append(s)
      else:
         c.append(s)
   v.extend(c)
   return "".join(v)

print(move_vow("this is DCU!"))
