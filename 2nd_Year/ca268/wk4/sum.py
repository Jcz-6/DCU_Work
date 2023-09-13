#!/usr/bin/env python3

number = 2

def sum_of(number):
	if number == 0:
		return 0
	else:
		return number + sum_of(number - 1)



print(sum_of(number))
