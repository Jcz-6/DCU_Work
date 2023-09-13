#!/usr/bin/env python3

import sys

string = "deez nuts"

def count_len(string):
	if string == "":
		return 0
	else:
		return 1 + count_len(string[:-1])

print(count_len(string))
