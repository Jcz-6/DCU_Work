#!/usr/bin/env python3


message = "Hello" + " world.\n"
h = "hello.txt"

with open(h, "w") as f:
   f.write(message)
