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

   def __eq__(a1, a2):
      return a1.total_time() == a2.total_time()

   def __gt__(a1, a2):
      return a1.total_time() > a2.total_time()

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

   def best(self):
       best = {}
       for key in self.members.keys():
          best[key] = self.members[key].total_time()
       b_time = min([v for v in best.values()])
       for k, v in best.items():
          if v == b_time:
             return f"Name: {self.members[k].name}\nID: {self.members[k].tid}\nRace time: {b_time}"

   def worst(self):
      worst = {}
      for key in self.members.keys():
         worst[key] = self.members[key].total_time()
      w_time = max([v for v in worst.values()])
      for k, v in worst.items():
         if v == w_time:
            return f"Name: {self.members[k].name}\nID: {self.members[k].tid}\nRace time: {w_time}"
