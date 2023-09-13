#!/usr/bin/env python3

import sys

class Meeting(object):
   def __init__(self, hour, minute, duration):
      self.hour = hour
      self.minute = minute
      self.duration = duration

   def __str__(self):
      if len(str(self.hour)) < 2:
         self.hour = "0" + str(self.hour)
      if len(str(self.minute)) < 2:
         self.minute = "0" + str(self.minute)
      return f"{self.hour}:{self.minute} ({self.duration} minutes)"

class Schedule(object):
   def __init__(self):
      self.list = []

   def add(self, meeting):
      self.list.append(f"{meeting}")

   def __str__(self):
      start = ["Schedule", "--------"]
      self.list.sort()
      slist = start + self.list
      slist.append(f"Meetings today: {len(slist) - 2}")
      return "\n".join(slist)
