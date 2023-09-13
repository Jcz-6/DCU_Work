#!/usr/bin/env python3


import sys

d = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
     "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
     "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen", "15": "fifteen",
     "16": "sixteen", "17": "seventeen", "18": "eighteen", "19": "nineteen",
     "20": "twenty", "30": "thirty", "40": "forty", "50": "fifty", "60": "sixty",
     "70": "seventy", "80": "eighty", "90": "ninety", "100": "one hundred"}

lines = [str(line.strip()) for line in sys.stdin]


def words(s):
   s = s.split()
   num_words = []
   for c in s:
      if len(c) == 3:
         num_words.append("one hundred")
      elif len(c) == 2 and c[1] == "0":
         num_words.append(d[c])
      elif len(c) == 2 and c[0] >= "2":
         num_words.append(d[(c[0] + "0")] + "-" + d[c[1]])
      else:
         num_words.append(d[c])
   return " ".join(num_words)


for line in lines:
   s = line.strip()
   print(words(s))
