#!/usr/bin/env python3

import sys


def numbers(g):
	g = g.split()
	g[0] = int(g[0])
	g[1] = int(g[1])
	g[2] = int(g[2])
	g.sort()
	return g


g = sys.stdin.readline().strip()

digits = numbers(g)

f = sys.stdin.readline().strip()

d = {
     "A" : str(digits[0]),
     "B" : str(digits[1]),
     "C" : str(digits[2])}

print(d[f[0]] + " " + d[f[1]] + " " + d[f[2]])