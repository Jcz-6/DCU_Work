#!/usr/bin/env python3

class Q3(object):
	def __init__(self, fname, lname, age):
		self.fname = fname
		self.lname = lname
		self.age = age

p1 = Q3('Barack', 'Obama', 40)
p2 = Q3('Abraham', 'Lincoln', 21)
p3 = Q3('Donald', 'Trump', 14)


def sort_class4(lst, att):
	ans = sorted(lst, key=lambda x: getattr(x, att))
	return ans


	


print(sort_class4([p1, p2, p3], 'fname'))


