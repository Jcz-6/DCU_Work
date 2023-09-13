#!/usr/bin/env python3

a = []
s = input()

while s != "end":
   s = int(s)
   a.append(s)
   s = input()

i = 1
p = 0
while i < len(a):
   if a[i] < a[p]:
      p = i
   i = i + 1

print(p)
