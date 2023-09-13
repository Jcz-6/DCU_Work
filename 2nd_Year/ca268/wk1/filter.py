#!/usr/bin/env python3

def filter_star(d, n):
   rating = n * "*"
   same_r = {}
   for item in d.items():
      if rating in item:
         same_r[item[0]] = item[1]
   if same_r:
      return print(same_r)
   else:
      return print(f"No results found!")

filter_star({
  'Luxury Chocolates': '*****',
  'Tasty Chocolates': '****',
  'Big Chocolates': '*****',
  'Generic Chocolates': '***'
}, 4)

