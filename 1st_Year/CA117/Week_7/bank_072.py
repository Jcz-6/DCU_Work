#!/usr/bin/env python3

import sys

class BankAccount(object):
   def __init__(self, balance=0):
      self.balance = balance

   def __str__(self):
      return f"Your current balance is {self.balance:.02f} euro"

   def deposit(self, value):
      self.balance = self.balance + float(value)

   def withdraw(self, value):
      if self.balance >= value:
         self.balance = self.balance - float(value)
