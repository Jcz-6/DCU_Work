#!/usr/bin/env python3

x = int(input())
y = int(input())
z = int(input())
i_triangle = x == y != z or x == z != y or y == z != x or x == y == z
print(i_triangle)
