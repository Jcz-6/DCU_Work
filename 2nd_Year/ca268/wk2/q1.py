#!/usr/bin/env python3

class Q1(object):
   def __init__ (self, fname, lname, salary):
      self.fname = fname
      self.lname = lname
      self.salary = salary

   def get_email(self):
   	  return f"{self.fname}.{self.lname}@dcu.ie"


jeff = Q1("jeff", "white", 500)
print(jeff.get_email())