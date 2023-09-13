#!/usr/bin/env python3

def q1_sum(l):
   even = []
   for item in l:
      for n in item:
         if n % 2 == 0:
            even.append(n)
   return sum(even)

print(q1_sum(l))
