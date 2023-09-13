#!/usr/bin/env python3

import sys

a = []
try:
    with open(sys.argv[1], "r") as s:
      maxl = -1
      for line in s:
         a.append(line.strip())
         d = line.strip().split()
         if int(d[0]) > int(maxl):
            maxl = d[0]

except FileNotFoundError:
   print(f'The file {sys.argv[1]} could not be opened')

for i in range(len(a)):
   if str(maxl) in a[i]:
      student = a[i][3:]
      break

print(f'Best student: {student}')
print(f'Best mark: {maxl}')
