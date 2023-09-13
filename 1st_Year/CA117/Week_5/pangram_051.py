#!/usr/bin/env python3

import sys

import string

alpha = string.ascii_lowercase

lines = [line.strip().lower() for line in sys.stdin]


def count(s):
   missing = ""
   for c in alpha:
      if c not in s:
         missing = missing + c
   if missing == "":
      return "pangram"
   return "missing " + missing


for line in lines:
   s = line
   print(count(s))
