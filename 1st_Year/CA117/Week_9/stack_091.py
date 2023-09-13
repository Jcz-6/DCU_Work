#!/usr/bin/env python3

import sys

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
