#!/usr/bin/env python3

import sys

words = sys.stdin.readline().strip()
snap = {}

while 0 < len(words) and words not in snap:
   snap[words] = 1
   words = sys.stdin.readline().strip()

if words in snap:
   print("snap:", words)
