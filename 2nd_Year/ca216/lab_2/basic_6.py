from multiprocessing import *
import time
from random import randint


def greet2(q):
    for i in range(5):
        print()
        print(("(child process) Waiting for name", i))
        name = q.get()
        print(("(child process) Well, hi", name))

def sendName2():
    q = Queue()
   
    p1 = Process(target=greet2, args=(q,))
    p1.start()

    for i in range(5):
        time.sleep(randint(1,4))
        print("(main process) Ok, I'll send the name")
        q.put("George"+str(i))

#execute
def slowpoke(lock):
    time.sleep(10)
    lock.acquire()
    print("Slowpoke: Ok, I'm coming")
    lock.release()

def haveToWait():
    lock = Lock()
    p1 = Process(target=slowpoke, args=(lock,))
    p1.start()
    print("Waiter: Any day now...")

    p1.join()
    print("Waiter: Finally! Geez.")

def addTwoNumbers(a, b, q):
    # time.sleep(5) # In case you want to slow things down to see what is happening.
    q.put(a+b)

def addTwoPar():
    x = eval(input("Enter first number: "))
    y = eval(input("Enter second number: "))

    q = Queue()
    p1 = Process(target=addTwoNumbers, args=(x, y, q))
    p1.start()
    result = q.get()
    print(result)

addTwoPar()