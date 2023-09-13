#!/usr/bin/env python3

import sys

class Point(object):
   def __init__(self, x=0, y=0):
      self.x = x
      self.y = y

   def __str__(self):
      return f"({self.x:.01f}, {self.y:.01f})"

   def midpoint(self, other):
      midx = (self.x + other.x) / 2
      midy = (self.y + other.y) / 2
      return Point(midx, midy)


class Circle(object):
   def __init__(self, centre=None, radius=1):
      if centre is None:
         self.centre = Point()
      else:
         self.centre = centre
      self.radius = radius

   def __str__(self):
      centre = f"Centre: {self.centre}"
      radius = f"Radius: {self.radius:d}"
      circle = [centre, radius]
      answer = "\n".join(circle)
      return answer
