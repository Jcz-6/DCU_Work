#!/usr/bin/env python3

import sys

def factorial(n):
   if n == 1:
      return 1
   if n == 0:
      return 1
   return n * factorial(n - 1)
