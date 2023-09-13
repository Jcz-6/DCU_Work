#!/usr/bin/env python3

import sys

class Point(object):
   def __init__(self, x=0, y=0):
      self.x = x
      self.y = y

   def __str__(self):
      return f"({self.x:.01f}, {self.y:.01f})"

   def distance(self, point):
      distance_s = (point.x - self.x) ** 2 + (point.y - self.y) ** 2
      distance = distance_s ** 0.5
      return distance
