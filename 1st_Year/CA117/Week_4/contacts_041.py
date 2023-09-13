#!/usr/bin/env python3

import sys

with open(sys.argv[1], "r") as f:
   contacts = [line.strip().split() for line in f]

names = [line.strip() for line in sys.stdin]

phone_book = {}
for line in contacts:
   phone_book[line[0]] = line[1]

for name in names:
   print(f"Name: {name}")
   if phone_book.get(name) is None:
      print(f"No such contact")
   else:
      print(f"Phone: {phone_book[name]}")
