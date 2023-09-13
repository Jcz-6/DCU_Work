from multiprocessing import *

def sayHi():
    print("Hi from process", current_process().pid)

def procEx():
    print("Hi from process", current_process().pid, "(parent process)")

    otherProc = Process(target=sayHi, args=())
    otherProc_2 = Process(target=sayHi, args=())
    otherProc_3 = Process(target=sayHi, args=())



    otherProc.start()
    otherProc_2.start()
    otherProc_3.start()

### execute
procEx()