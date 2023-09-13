class Queue:

    def __init__(self):
        self.items = []

    def is_empty(self):
        return self.items == []

    def enqueue(self, item):
        self.items.insert(0, item)

    def full_queue(self):
        return self.items

    def dequeue(self):
        return self.items.pop()

    def size(self):
        return len(self.items)

############################ Question 1 ###############################
    def queue_reverse(self, n=None):
        if n == None:
            n = self.size()
        else:
            n = n * 2

        if n - 1 > self.size():
            return "The queue is is smaller than the given number of elements"

        for i in range(n // 2):
            tmp = self.items[i]
            self.items[i] = self.items[-i - 1]
            self.items[-i - 1] = tmp

        return self.items

    def sort_queue(self, n=None):
        if n == None:
            n = self.size()
        count = 0

        if n == 1:
            return

        for i in range(n - 1):
            if self.items[i] > self.items[i + 1]:
                tmp = self.items[i]
                self.items[i] = self.items[i + 1]
                self.items[i + 1] = tmp
                count += 1
        if count == 0:
            return

        self.sort_queue(n - 1)

############################## Question 2 #######################

    def binary_seq(self, number):
        if number == 1:
            return self.enqueue(bin(number)[2:])
        self.enqueue(bin(number)[2:])
        self.binary_seq(number - 1)
############################### Question 4 ######################

    def asterisk_letter_queue(self, sequence):
        answer = []
        for char in sequence:
            if char.isalpha():
                self.enqueue(char)
            else:
                answer.append(self.dequeue())
        return answer

if __name__ == '__main__':
    q = Queue()
    #q.enqueue(1)
    #q.enqueue(2)
    #q.enqueue(3)
    #q.enqueue(4)
    #q.enqueue(5)
    #q.enqueue(6)
    #q.enqueue(7) 
    #q.binary_seq(16)
    #print(q.full_queue())
    #print(q.queue_reverse(5))
    #q.sort_queue()

    #print(q.asterisk_letter_queue('EAS*Y*QUE***ST***IO*N***'))


class Stack:

    def __init__(self):
        self.items = []

    def is_empty(self):
        return self.items == []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def top(self):
        return self.items[len(self.items) - 1]

    def size(self):
        return len(self.items)

############################## Question 3 #######################        

    def asterisk_letter_stack(self, sequence):
        answer = []
        for char in sequence:
            if char.isalpha():
                self.push(char)
            else:
                answer.append(self.pop())
        return answer

############################ Question 6 #####################
    
    def eval_this(self, sequence):
        for char in sequence:
            if char.isalnum():
                self.push(int(char))

            if char == "+":
                n1 = self.pop()
                n2 = self.pop()
                self.push((n2 + n1))

            elif char == "^":
                n1 = self.pop()
                n2 = self.pop()
                self.push((n2 ** n1))

            elif char == "*":
                n1 = self.pop()
                n2 = self.pop()
                self.push((n2 * n1))

            elif char == "-":
                n1 = self.pop()
                n2 = self.pop()
                self.push((n2 - n1))


        return self.pop()


if __name__ == '__main__':
    s = Stack()
    #print(s.asterisk_letter_stack('EAS*Y*QUE***ST***IO*N***'))

############################ Question 5 #####################
    #seq="abcdefg"
    
    #for char in seq:
    #    s.push(char)

    #for i in range(s.size()):
    #    print(s.pop())


    print(s.eval_this("1432^*+147--+"))
