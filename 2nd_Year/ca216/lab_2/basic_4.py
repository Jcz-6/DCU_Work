from multiprocessing import *


def dig(workerName, holeID, lock):
    lock.acquire()
    print("Hiddy-ho!  I'm worker", workerName, "and today I have to dig hole", holeID)
    lock.release()

def assignDiggers():
    lock = Lock()
    workerNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    for holeID in range(len(workerNames)):
        Process(target=dig, args=(workerNames[holeID], holeID, lock)).start()

assignDiggers()