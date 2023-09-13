#!/usr/bin/env python3

import sys

lines = sys.stdin.readlines()

lines = [line.strip() for line in lines]

l17 = [line for line in lines if len(line) == 17]
l18 = [line for line in lines if len(line) >= 18]
a4 = [line for line in lines if (line.lower()).count("a") == 4]
q2 = [line for line in lines if (line.lower()).count("q") >= 2]
cie = [line for line in lines if "cie" in line.lower()]
angle = [line for line in lines if sorted(line.lower()) == sorted("angle") and line != "angle"]

print(f'Words containing 17 letters: {l17}')
print(f'Words containing 18+ letters: {l18}')
print(f"Words with 4 a's: {a4}")
print(f"Words with 2+ q's: {q2}")
print(f'Words containing cie: {cie}')
print(f'Anagrams of angle: {angle}')
