

Jakub Czerniejewski
ID: 21466494






Question1

#!/usr/bin/env python3

def q1_sum(l):
   even = []
   for item in l:
      for n in item:
         if n % 2 == 0:
            even.append(n)
   return sum(even)

print(q1_sum(l))


Question2

#!/usr/bin/env python3

def move_vow(line):
   vowels = "aeiouAEIOU"
   v = []
   c = []
   for s in line:
      if s in vowels:
         v.append(s)
      else:
         c.append(s)
   v.extend(c)
   return "".join(v)

print(move_vow("this is DCU!"))


Question3

#!/usr/bin/env python3

guests = {
    'Randy': 'Germany',
    'Karla': 'France',
    'Wendy': 'Japan',
    'Norman': 'England',
    'Sam': 'Argentina'
}

def greetings(name):
   if name in guests.keys():
      return f"Hi! I'm {name} and I'm from {guests[name]}."
   else:
      return f"Hi! I'm {name}"

print(greetings("Sam"))


Question4

#!/usr/bin/env python3

class Memories(object):

   def __init__ (self, **kwargs):
      self.memories = kwargs

   def remember(self, word):
      if word in self.memories.keys():
         return self.memories[word]
      else:
         return False


Question5

#!/usr/bin/env python3

class Test(object):

   def __init__(self, subject, grades, perc):
      self.subject_name = subject
      self.correct_answers = [] if grades == None else grades
      self.passing_mark = perc

class Student(object):

   def __init__(self, name):
      self.name = name

   def take_test(self, test, ans):
      ca = test.correct_answers
      self.ans = [] if ans == None else ans
      pass_mark = int(test.passing_mark[:2])
      markpq = 100 // len(ca)
      mark = 0
      for ans in self.ans:
         if ans in ca:
            mark = mark + markpq
      if mark > pass_mark:
         return f"{self.name} passed the {test.subject_name} test with the score of {mark}.0%"
      else:
         return f"{self.name} failed the {test.subject_name} test!"


paper1 = Test('Maths', ['1A', '2C', '3D', '4A', '5A'], '60%')
paper2 = Test('Chemistry', ['1C', '2C', '3D', '4A'], '75%')
paper3 = Test('Computing', ['1D', '2C', '3C', '4B', '5D', '6C', '7A'], '75%')

stu1 = Student("Tom")
print(stu1.take_test(paper2, ['1C', '2C', '3D', '4A']))


Question6

#!/usr/bin/env python3

def histogram(numbers, symbol):
   ans = []
   for n in numbers:
      ans.append(n * symbol)
   return ans
print('\n'.join(histogram([6,2,15,3,20,5], "=")))


Question7

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



