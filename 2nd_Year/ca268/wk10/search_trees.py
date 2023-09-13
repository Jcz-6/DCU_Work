class Tree:
    def __init__(self, data):
        self.left = None
        self.right = None
        self.data = data

def get_height(root):

        if not root:
            return - 1

        return 1 + max(get_height(root.left), get_height(root.right))

def is_balanced(root):
    return abs(get_height(root.left) - get_height(root.right)) <= 1

root = Tree(1)
root.left = Tree(2)
root.right = Tree(3)
root.left.left = None
root.left.right = None
root.right.left = Tree(6)
root.right.right = Tree(7)
root.right.right.right = Tree(17)
root.right.right.right.right = Tree(117)



print(is_balanced(root))