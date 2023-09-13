#!/usr/bin/env python3

if __name__ == "__main__":
   a = ["dog", "cat", "mousee"]

i = 0
while i < len(a):
   if len(str(a[i])) >= 6:
      print(a[i])
   i = i + 1
