#!/usr/bin/env python3

import sys

saved_values = {}


def is_in_d(dn, value):
   for items in dn.items():
      if value in items:
         return items[0]
   return "unknown"


def calculator(s, saved_values):
   try:
      total = saved_values[s[1]]
      calc_eq = " ".join(s[1:])
      for i in range(2, len(s) + 1, 2):
         if s[i] == "+" and saved_values[s[i + 1]]:
            total = total + (saved_values[s[i + 1]])
         elif s[i] == "-" and saved_values[s[i + 1]]:
            total = total - (saved_values[s[i + 1]])
      return f"{calc_eq} {is_in_d(saved_values, total)}"
   except KeyError:
      return f"{calc_eq} unknown"


for line in sys.stdin:
   line = line.strip().split()
   if line[0] == "def":
      saved_values[line[1]] = int(line[2])
   if line[0] == "clear":
      saved_values.clear()
   if line[0] == "calc":
      print(calculator(line, saved_values))
