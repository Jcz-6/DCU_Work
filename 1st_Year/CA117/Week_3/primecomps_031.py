#!/usr/bin/env python3

import sys


def primes(s):
   noprimes = [j for i in range(2, int(s) + 1) for j in range(i * 2, int(s) + 1, i)]
   numbers = [n for n in range(2, int(s) + 1) if n not in noprimes]
   print(f"Primes: {numbers}")


for line in sys.stdin:
   s = line.strip()
   primes(s)
