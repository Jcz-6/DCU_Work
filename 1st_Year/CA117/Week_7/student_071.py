#!/usr/bin/env python3

import sys

class Student(object):
   def set_attributes(self, sid, name, modlist):
      self.sid = sid
      self.name = name
      self.modlist = modlist

   def print_attributes(self):
      print(f"ID: {self.sid}")
      print(f"Name: {self.name}")
      print(f"Modules: {', '.join(self.modlist)}")

   def add_module(self, mod):
      self.modlist.append(mod)

   def del_module(self, mod):
      self.modlist.remove(mod)
