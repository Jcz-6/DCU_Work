#!/usr/bin/env python3

n = int(input())
m = (n // 100)
x = m % 100
y = x // 10
print(y + x % 10 * 10)
