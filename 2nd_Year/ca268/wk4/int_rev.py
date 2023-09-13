#!/usr/bin/env python3

import sys

number = 321
def int_rev(number, rev_number=0):
	if number == 0:
		return rev_number
	else:
		rev_number = (rev_number * 10) + number % 10
		return int_rev(number//10, rev_number)
print(int_rev(number))
