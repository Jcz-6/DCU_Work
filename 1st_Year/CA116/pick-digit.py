#!/usr/bin/env python3

n = int(input())
p = int(input())
x = n % (10 ** (p + 1))
y = x // (10 ** p)
print(y)
