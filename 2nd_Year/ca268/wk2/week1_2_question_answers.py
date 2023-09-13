
Jakub Czerniejewski
ID 21466494



************** QUESTION 1 **********

#!/usr/bin/env python3

class Q1(object):
   def __init__ (self, fname, lname, salary):
      self.fname = fname
      self.lname = lname
      self.salary = salary

   def get_email(self):
   	  return f"{self.fname}.{self.lname}@dcu.ie"


jeff = Q1("jeff", "white", 500)
print(jeff.get_email())

********************* QUESTION 2 **********

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

******************** QUESTION 3 ********************

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
	ans = sorted([getattr(item, att) for item in lst])
	ans_sort = []
	for i in range(len(lst)):
		for k, v in {p1: "p1", p2: "p2", p3: "p3"}.items():
			if getattr(k, att) == ans[i]:
				ans_sort.append(v)

	return ans_sort





print(sort_class4([p1, p2, p3], 'fname'))

********************** QUESTION 4 *************

#!/usr/bin/env python3

class Smoothie(object):
	def __init__(self, ingredients):
		self.d = {"Banana": 0.50, "Strawberries": 1.50,
		"Mango": 2.50, "Blueberries": 1.00, "Raspberries": 1.00,
		"Apple": 1.75, "Pineapple": 3.50}
		self.ingredients = [] if None else ingredients

	def get_cost(self):
		total = 0
		for item in self.ingredients:
			total = total + self.d[item]
		return print(f"€{total:.02f}")

	def get_price(self):
		total = 0
		for item in self.ingredients:
			total = total + self.d[item]
		total = total + 2.50
		return print(f"€{total:.02f}")

	def get_name(self):
		if len(self.ingredients) >= 2:
			return print(f"{' '.join(self.ingredients)} Fusion")
		else:
			return print(f"{''.join(self.ingredients)} Smoothie")

drink = Smoothie(["Banana", "Mango"])

drink.get_cost()
drink.get_price()
drink.get_name()

************************ QUESTION 5 ********

#!/bin/usr/env python3



class Pizza(object):
	_counter = 0


	def __init__(self, ingredients):
		Pizza._counter += 1
		self.pizza_ingredients = [] if None else ingredients
		self.order = Pizza._counter

	def diavola():
		return Pizza(['Mozzarella', 'Spicy sausage', 'Pomodorino tomatoes'])


	def serrano():
		return Pizza(['Black olives', 'Red onion', 'Cooked picadillo'])


	def margherita():
		return Pizza(['Red tomatoes', 'White mozzarella', 'Green basil'])

	
	def order_number(self):
		return print(self.order)

	def ingredients(self):
		return print(self.pizza_ingredients)




p1 = Pizza(['Black olives', 'Red onion', 'Meatballs'])
p2 = Pizza(['Black olives', 'Red onion', 'Meatballs'])
p3 = Pizza.diavola()
p1.order_number()
p2.order_number()
p3.order_number()
p1.ingredients()
p2.ingredients()
p3.ingredients()

***************** QUESTION 6 *****************

#!/usr/bin/env python3

class Employee(object):
	def __init__(self, name, **kwargs):
		self.firstname = name.split()[0]
		self.lastname = name.split()[1]
		self.d = kwargs
		for k,v in self.d.items():
			setattr(self, k, v)

#tom = Employee("Tom Ford")
#print(tom.firstname)
#print(tom.lastname)
#jack = Employee('Jack Nicholson', nationality='American', age=84)
#print(jack.d)
#print(jack.age)
#print(jack.nationality
