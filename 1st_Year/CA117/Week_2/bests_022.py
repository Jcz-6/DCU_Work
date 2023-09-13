#!/usr/bin/env python3

import sys

a = []
try:
    with open(sys.argv[1], "r") as s:
      maxl = -1
      for line in s:
         a.append(line.strip())
         d = line.strip().split()
         try:
            if int(d[0]) > int(maxl):
               maxl = d[0]
         except ValueError:
            print(f'Invalid mark {d[0]} encountered. Skipping.')

except FileNotFoundError:
   print(f'The file {sys.argv[1]} could not be opened')

c = []
for i in range(len(a)):
   if str(maxl) in a[i]:
      c.append(a[i][3:])

student = ", ".join(c)

print(f'Best student(s): {student}')
print(f'Best mark: {maxl}')
