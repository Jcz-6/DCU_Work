#!/usr/bin/env python3

s = input()
a = []

while s != "end":
   if s != "end":
      s = int(s)
      a.append(s)
      s = input()

i = 0
while i < len(a):
   if a[i] % 2 == 0:
      print(a[i])
   i = i + 1

j = 0
while j < len(a):
   if a[j] % 2 == 1:
      print(a[j])
   j = j + 1
