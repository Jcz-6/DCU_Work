#!/usr/bin/env python3

n = int(input())
curr = n
priv = 0
while n != 0:
   priv = curr
   n = int(input())
   curr = n
   if curr == 0:
      n = n * curr
   elif priv == curr:
      print("equal")
   elif priv < curr:
      print("higher")
   elif priv > curr:
      print("lower")
