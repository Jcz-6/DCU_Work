#!/usr/bin/env python3

import sys

import calendar

a = ["Monday's child is fair of face", "Tuesday's child is full of grace", "Wednesday's child is full of woe", "Thursday's child has far to go", "Friday's child is loving and giving", "Saturday's child works hard for a living", "Sunday's child is fair and wise and good in every way"]
b = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def day(s):
   s = s.split()
   day = calendar.weekday(int(s[2]), int(s[1]), int(s[0]))
   return "You were born on a" + " " + b[day] + " " + "and" + " " + a[day] + "."


for line in sys.stdin:
   s = line.strip()
   print(day(s))
