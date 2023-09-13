#!/usr/bin/env python3

def histogram(numbers, symbol):
   ans = []
   for n in numbers:
      ans.append(n * symbol)
   return ans
print('\n'.join(histogram([6,2,15,3,20,5], "=")))
