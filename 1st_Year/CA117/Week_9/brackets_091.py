#!/usr/bin/env python3

import sys


def matcher(line):

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

   d = {")": "(", "}": "{", "]": "["}
   left = ["(", "{", "["]
   right = [")", "}", "]"]
   x = Stack()

   for c in line:
      if c in left:
         x.push(c)

      if c in right:
         try:
            if x.pop() != d[c]:
               return False
         except IndexError:
            return False

   return x.is_empty()
