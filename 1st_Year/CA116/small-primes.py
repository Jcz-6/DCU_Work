#!/usr/bin/env python3

n = int(input())
if n < 20 and n == 2 or n == 3:
    print("prime")
elif n == 1 or n % 2 == 0 or n % 3 == 0:
    print("not prime")
else:
    n < 20 and n % 2 == 1 and n % 3 != 0
    print("prime")
