#!/usr/bin/env python3

import sys

class Triathlete(object):

   def __init__(self, name, tid):
      self.name = name
      self.tid = tid

   def __str__(self):
      return f"Name: {self.name}\nID: {self.tid}"

class Triathlon(object):

   def __init__(self):
      self.members = {}

   def add(self, athlete):
      self.members[athlete.tid] = athlete

   def lookup(self, tid):
      if tid in self.members:
         return self.members[tid]
      else:
         return None

   def remove(self, tid):
      self.members.pop(tid)

   def __str__(self):
      athletes = sorted([(v.name, v.tid) for k, v in self.members.items()])
      answer = []
      for items in athletes:
         answer.append(f"Name: {items[0]}")
         answer.append(f"ID: {items[1]}")
      return "\n".join(answer)
