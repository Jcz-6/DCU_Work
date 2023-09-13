#!/usr/bin/env python3

import sys
position = sys.argv[1]
s = "," + input()

i = 0
j = 0
fp = -1
while i < len(s) and s[i:j] != position:
    i = j
    j = i + 1
    while j < len(s) and s[j] != ",":
        j = j + 1
    fp = fp + 1
    i = i + 1
print(fp)
