#!/usr/bin/env python3

import sys

def mutiply_this(num_1, num_2):
	if num_2 == 0:
		return 0
	if num_2 < 0:
		return - num_1 + mutiply_this(num_1, num_2 + 1)
	return num_1 + mutiply_this(num_1, num_2 - 1)

print(mutiply_this(-10, -10))

