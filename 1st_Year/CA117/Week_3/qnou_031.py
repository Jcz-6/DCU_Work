#!/usr/bin/env python3

import sys

lines = sys.stdin.readlines()
lines = [line.strip() for line in lines]

no_u = [line for line in lines if "q" in line.lower() and "qu" not in line.lower()]
if len(lines) > 0:
   print(f"Words with q but no u: {no_u}") 