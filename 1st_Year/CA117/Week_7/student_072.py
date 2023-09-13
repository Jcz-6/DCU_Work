#!/usr/bin/env python3

import sys

class Student(object):
   def __init__(self, sid, name, modlist=None):
      self.sid = sid
      self.name = name
      self.modlist = [] if modlist is None else modlist

   def __str__(self):
      s_info = []
      s_info.append(f"ID: {self.sid}")
      s_info.append(f"Name: {self.name}")
      s_info.append(f"Modules: {', '.join(self.modlist)}")
      student = "\n".join(s_info)
      return student

   def add_module(self, mod):
      if mod not in self.modlist:
         self.modlist.append(mod)

   def del_module(self, mod):
      if mod in self.modlist:
         self.modlist.remove(mod)
