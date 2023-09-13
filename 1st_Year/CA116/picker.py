#!/usr/bin/env python3

a = int(input())
b = int(input())
c = int(input())
x = a * (1 - c % 2) + b * (c % 2)
print(x)
