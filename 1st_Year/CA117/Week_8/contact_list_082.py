#!/usr/bin/env python3

import sys

class Contact(object):
   def __init__(self, name, phone, email):
      self.name = name
      self.phone = phone
      self.email = email

   def __str__(self):
      return f"{self.name} {self.phone} {self.email}"


class ContactList(object):
   def __init__(self):
      self.d = {}

   def add(self, contact):
      self.d[contact.name] = contact

   def remove(self, name):
      if name in self.d:
         del self.d[name]

   def get(self, name):
      if name in self.d:
         return self.d[name]
      return None

   def __str__(self):
      clist = []
      clist.append("Contact list")
      clist.append("------------")
      for k, v in sorted(self.d.items()):
         clist.append(f"{v}")
      return "\n".join(clist)
