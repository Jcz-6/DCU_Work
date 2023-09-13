#!/usr/bin/env python3

import sys

def calculator(line):
   from math import sqrt

   class Stack(object):
      def __init__(self):
         self.ls = []

      def push(self, item):
         self.ls.append(item)

      def pop(self):
         return self.ls.pop()

      def top(self):
         return self.ls[-1]

      def is_empty(self):
         return not(self.ls)

      def __len__(self):
         return len(self.ls)

   binops = {'+': float.__add__,
             '-': float.__sub__,
             '*': float.__mul__,
             '/': float.__truediv__}

   uniops = {'n': float.__neg__,
             'r': sqrt}

   x = Stack()

   for c in line.split():
      if c.replace(".", "").isnumeric():
         x.push(float(c))

      if c in binops.keys():
         p1 = x.pop()
         p2 = x.pop()
         eq = binops[c](p2, p1)
         x.push(eq)

      if c in uniops.keys():
         p1 = x.pop()
         eq = uniops[c](p1)
         x.push(eq)
   return x.pop()
