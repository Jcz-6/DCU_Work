#!/usr/bin/env python3

import sys

number = 112

def pronic(number, n =0):
	if n*(n + 1) == number:
		return True
	if n*(n + 1) > number:
		return False
	return pronic(number, n + 1)


print(pronic(number))