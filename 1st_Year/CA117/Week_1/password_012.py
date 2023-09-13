#!/usr/bin/env python3

import sys


def lower(s):
   lower = 0
   for i in range(len(s)):
      if s[i].islower():
         lower = 1
   return lower

def upper(s):
   upper = 0
   for i in range(len(s)):
      if s[i].isupper():
         upper = 1
   return upper


def digit(s):
   digit = 0
   for i in range(len(s)):
      if s[i].isdigit():
         digit = 1
   return digit


def char(s):
   char = 0
   for i in range(len(s)):
      if not s[i].isalnum():
         char = 1
   return char


for line in sys.stdin:
   total = 0
   s = line.strip()
   total = lower(s) + upper(s) + digit(s) + char(s)
   print(total)
