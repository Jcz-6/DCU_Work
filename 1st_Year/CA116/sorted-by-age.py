#!/usr/bin/env python3

a = []
s = input()

while s != "end":
   a.append(s)
   s = input()

i = 0
while i < len(a):
   p = i
   j = i + 1
   while j < len(a):
      if a[j][6:8] + a[j][3:5] + a[j][0:2] < a[p][6:8] + a[p][3:5] + a[p][0:2]:
         p = j
      j = j + 1
   print(a[p][9:])
   tmp = a[p]
   a[p] = a[i]
   a[i] = tmp
   i = i + 1
