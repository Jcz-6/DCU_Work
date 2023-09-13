#!/usr/bin/env python3

import sys

string = "123"

def str_rev(string):
	rev_str = ""
	if len(string) == 1:
		return string[-1]
	else:
		return rev_str + string[-1] + str_rev(string[:-1])


