#!/usr/bin/evn python3

import sys

lines = [line.strip() for line in sys.stdin]


def vertical(lines):
   v_lines = []
   for i in range(len(lines[0])):
      s = ""
      for line in lines:
         s = s + line[i]
      v_lines.append(s)
   return v_lines


def sort_list(v_lines):
   return sorted(v_lines, key=lower_k)


def lower_k(n):
   return n.lower()


def main():
   print("\n".join((vertical(sort_list(vertical(lines))))))


if __name__ == "__main__":
   main()
