#!/usr/bin/env python3

import sys
m = sys.argv[1]
message = "Hello world.\n"

with open(m, "w") as f:
   f.write(message)
