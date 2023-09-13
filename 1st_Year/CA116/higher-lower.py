#!/usr/bin/env python3

i = 0
m = 5
curr = int(input())
priv = 0
while i < m:
    n = int(input())
    priv = curr
    curr = n
    if curr == priv:
        print("equal")
    elif curr > priv:
        print("higher")
    elif curr < priv:
        print("lower")
    i = i + 1
