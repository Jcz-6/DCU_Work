#!/usr/bin/env python3

s = input()
i = 0

while i < len(s) and not("0" <= s[i] and s[i] <= "9"):
   i = i + 1

if i < len(s):
   j = i
   while j < len(s) and("0" <= s[j] and s[j] <= "9"):
      j = j + 1
   if j < len(s):
      k = j
      while k < len(s) and not("0" <= s[k] and s[k] <= "9"):
         k = k + 1
      if k < len(s):
         m = k
         while m < len(s) and("0" <= s[m] and s[m] <= "9"):
            m = m + 1
         if m < len(s):
            print(s[k:m], k)
         else:
            print(s[k:], k)
