#!/usr/bin/env python3

import sys

class Element(object):
   def set_attributes(self, number, name, symbol, bp):
      self.number = number
      self.name = name
      self.symbol = symbol
      self.bp = bp

   def print_attributes(set_attributes):
      print(f"Number: {set_attributes.number}")
      print(f"Name: {set_attributes.name}")
      print(f"Symbol: {set_attributes.symbol}")
      print(f"Boiling point: {set_attributes.bp} K")
