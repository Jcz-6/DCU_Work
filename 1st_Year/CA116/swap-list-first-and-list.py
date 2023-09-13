#!/usr/bin/env python3

if __name__ == "__main__":
   a = ["dog", "cat", "mouse"]

i = 0
j = len(a) - 1
tmp = a[i]
a[i] = a[j]
a[j] = tmp
