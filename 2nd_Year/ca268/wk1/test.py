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
