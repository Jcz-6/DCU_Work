#!/usr/bin/env python3

a = int(input())
b = int(input())

while 0 < b:
   old_a = a
   old_b = b
   a = old_b
   b = old_a % a

print(a)
