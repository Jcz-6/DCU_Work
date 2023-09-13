#!/usr/bin/env python3

class Memories(object):

   def __init__ (self, **kwargs):
      self.memories = kwargs

   def remember(self, word):
      if word in self.memories.keys():
         return self.memories[word]
      else:
         return False
