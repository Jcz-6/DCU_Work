#!/usr/bin/env python3

import sys

class Stack(object):
   def __init__(self):
      self.ls = []

   def push(self, item):
      self.ls.append(item)

   def pop(self):
      return self.ls.pop()

   def top(self):
      return self.ls[-1]

   def is_empty(self):
      return not(self.ls)

   def __len__(self):
      return len(self.ls)


t = Stack()
t.push("dn")
vowels = ["a", "e", "i", "o", "u"]
dn = 0
for line in sys.stdin:
   line = line.strip()
   total = 0
   for i in range(len(line) - 1):
      if line[i] in vowels and line[i + 1] == line[i]:
         i = i + 1
         total = total + 1
   if total >= dn:
      dn = total
      t.pop()
      t.push(line)

print(t.top())
