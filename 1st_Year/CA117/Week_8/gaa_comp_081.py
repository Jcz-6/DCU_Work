#!/usr/bin/env python3

import sys

class Score(object):
   def __init__(self, goals=0, points=0):
      self.goals = goals
      self.points = points

   def __str__(self):
      return f"{self.goals} goal(s) and {self.points} point(s)"

   def g2p(self):
      points = (self.goals * 3) + (self.points)
      return points

   def __gt__(self, other):
      return self.g2p() > other.g2p()

   def __eq__(self, other):
      return self.g2p() == other.g2p()

   def __ge__(self, other):
      return self.g2p() >= other.g2p()
