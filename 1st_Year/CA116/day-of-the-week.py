#!/usr/bin/env python 3

m = int(input())
d = int(input())
month = (m * 30) - 30
date = month + d
x = (date - 1) % 7
day_of_the_week = x + 1
print(day_of_the_week)
