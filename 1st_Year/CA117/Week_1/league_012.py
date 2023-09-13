#!/usr/bin/env python3

import sys


lines = []
maxl = 0
for line in sys.stdin:
   lines.append(line.strip())
   s = line.split()
   if s[1] == s[-9]:
      if len(s[1]) > int(maxl):
         maxl = len(s[1])

   if len(s[1]) + len(s[2]) > (maxl):
      maxl = len(s[1]) + len(s[2])

print(f'{"POS": >{3}} {"CLUB": <{maxl}}{"P": <{2}}{"W": >{3}} {"D": >{3}} {"L": >{3}} {"GF": >{3}} {"GA": >{3}} {"GD": >{3}} {"PTS": >{3}}')
for line in lines:
   line = line.split()
   if len(line) == 10:
      print(f'{line[0]: >{3}} {line[1]: <{maxl - 1}}{line[2]: <{2}} {line[3]: >{3}} {line[4]: >{3}} {line[5]: >{3}} {line[6]: >{3}} {line[7]: >{3}} {line[8]: >{3}} {line[9]: >{3}}')
   else:
      print(f'{line[0]: >{3}} {line[1] + " " + line[2]: <{maxl - 1}}{line[3]: >{2}} {line[4]: >{3}} {line[5]: >{3}} {line[6]: >{3}} {line[7]: >{3}} {line[8]: >{3}} {line[9]: >{3}} {line[10]: >{3}}')
