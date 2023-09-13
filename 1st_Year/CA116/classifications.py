#!/usr/bin/env python3

mark = int(input())
first = mark >= 70
second = mark >= 50 and mark < 70
third = mark >= 40 and mark < 50
fail = mark < 40
e = str("first:")
f = str("second:")
g = str("third:")
h = str("fail:")
print(e, first)
print(f, second)
print(g, third)
print(h, fail)
