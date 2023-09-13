from multiprocessing import *

def sayHi2(n):
    print("Hi", n, "from process", current_process().pid)

def manyGreetings():
    print("Hi from process", current_process().pid, "(main process)")
    
    print("Input your name: ")
    n = input()
    print("Amount of processes")
    amount = int(input())
    
    for i in range(amount):
        p1 = Process(target=sayHi2, args=(n,))
        p1.start()

#execute
manyGreetings()