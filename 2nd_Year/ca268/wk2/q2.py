#!/usr/bin/env python3

class Q2(object):
	def __init__(self, name, age, height, weight):
		self.name = name
		self.age = age
		self.height = height
		self.weight = weight

	def get_age(self):
		return f"{self.name} is {self.age} years old"

	def get_height(self):
		return f"{self.name} is {self.height} cm tall"

	def get_weight(self):
		return f"{self.name} weighs {self.weight} kg"

jeff = Q2("jeff", 20, 185, 76)

print(jeff.get_height())