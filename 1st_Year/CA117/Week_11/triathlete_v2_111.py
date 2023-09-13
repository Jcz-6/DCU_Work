#!/usr/bin/env python3

import sys

class Triathlete(object):

   def __init__(self, name, tid):
      self.d = {}
      self.name = name
      self.tid = tid

   def __str__(self):
     return f"Name: {self.name}\nID: {self.tid}\nRace time: {self.total_time()}"

   def total_time(self):
      values = self.d.values()
      return sum(values)

   def add_time(self, type, time):
      self.d[type] = int(time)

   def get_time(self, type):
      return self.d[type]
