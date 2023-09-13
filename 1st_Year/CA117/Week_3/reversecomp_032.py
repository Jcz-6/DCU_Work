#!/usr/bin/env python3


import sys

lines = [line.strip() for line in sys.stdin if len(line) > 5]
lines_sorted = [line.lower() for line in lines]

def binsearch(query, sorted_list):
   low = 0
   high = len(sorted_list) - 1

   while low <= high:
      mid = (low + high) // 2

      if sorted_list[mid] < query:
         low = mid + 1

      elif sorted_list[mid] > query:
         high = mid - 1

      else:
         return True

   return False


reverse = [line for line in lines if binsearch(line.lower()[::-1], lines_sorted)]
print(reverse)
