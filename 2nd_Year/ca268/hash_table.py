from random import randrange


class HashTable:
    """Create a hash map backed by a Python list"""
    store = []
    number_elements = 0
    prime = 1009
    a = randrange(0, prime -1)
    b = randrange(0, prime -1)

    def __init__(self, n: int = 1):
        """
        Create storage for a HashTable with `n` entries.
        """
        if n > 0:
            self.store = [None] * n
        else:
            self.store = [None]


    def getindex(self, key) -> int:
        """Get the index corresponding to the given `key`"""
        if type(key) != str:
            _hash = hash(key)
        else:
            _hash = 0
            i = 0
            while i < len(key):
                unic = ord(key[i])
                _hash += unic * self.a ** (len(key) - 1 - i)
                i +=1
        return ((self.a * _hash + self.b) % self.prime) % len(self.store) # <-------------- Question 1
        
    def put(self, key, value):
        """
        Store the `value` at the index given by `key`, growing the underlying storage if necessary.
        """
        number_store = len(self.store)
        if self.number_elements + 1 == number_store:
            self.store = self.store + ([None] * number_store)

        index = self.getindex(key)
        self.number_elements += 1
        self.store[index] = value

    def get(self, key):
        """
        Retrieve the value at the index given by `key`, or `None`.
        """
        index = self.getindex(key)
        return self.store[index]

    def delete(self, key):
        """
        Remove the data at the index `key`, if it exists.
        """
        index = self.getindex(key)
        if self.store[index] is not None:
            self.number_elements -= 1
            self.store[index] = None


    def num_shift(self, n, p, d):
        bin_val = format(n, "032b")
        padding = "0" * p
        if d == "l":
            str_bin = bin_val[p:] + padding
        else:
            str_bin = padding + bin_val[:len(bin_val) - p]
           # str_bin = "0" *
        return int(str_bin, 2)

h = HashTable(1000)
h.put('DCU', 'D9')
h.put('TCD', 'D2')
h.put('UCD', 'D4')


print(h.get('DCU'))
print(h.get('TCD'))

#h.delete('UCD')
print(h.get('UCD'))
print(h.get('DCU'))
print(h.getindex('UCD'))
print(h.getindex('DCU'))
print(h.get('DCU'))
print(h.num_shift(4234, 5, 'r'))