#!/usr/bin/env python3

def swap_unique_keys_values(d):
   values = [v for v in d.values()]
   dict = {v: k for k, v in d.items() if values.count(v) == 1}
   return dict
