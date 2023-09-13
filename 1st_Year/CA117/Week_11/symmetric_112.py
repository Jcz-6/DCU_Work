#!/usr/bin/env python3

import sys

lines = [line.strip() for line in sys.stdin]

half_one = lines[::2]
half_two = lines[1::2]
print("\n".join(half_one + half_two[::-1]))
