#!/usr/bin/env python3

import sys

class Queue(object):
   def __init__(self):
      self.ls = []

   def enqueue(self, item):
      self.ls.append(item)

   def dequeue(self):
      return self.ls.pop(0)

   def first(self):
      return self.ls[0]

   def is_empty(self):
      return not(self.ls)

   def __len__(self):
      return len(self.ls)
