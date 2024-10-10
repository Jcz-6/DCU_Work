-- This is my 2 to 3 Tree data constructor.
-- It has two guards one for a 3 Tree and one for a Binary Tree.

data BinTree t = Empty 
    | Root t (BinTree t) (BinTree t)
    | Roots t t (BinTree t) (BinTree t) (BinTree t)
    deriving (Eq, Ord, Show)


-- Here are my Trees I used for testing myTree1 is a 3 to 2 Tree,
-- while myTree is a standard Binary tree.

myTree1 = Roots 5 10 (Root 3 Empty Empty) (Root 6 Empty Empty) (Root 12 Empty Empty)
myTree = Root 3 (Empty) (Empty)

-- My leaf definitions leaf x for a Binary tree leaf,
-- and leaf2 for a 2 to 3 Tree.

leaf x = Root x Empty Empty
leaf2 x y = Roots x y Empty Empty Empty

-- My add node function which takes in a number and places it correctly in the 2 to 3 Tree.

addnode :: Ord a => a -> BinTree a -> BinTree a
addnode z Empty = leaf z
addnode z (Roots x y left middle right)
    | z < x = Roots x y (addnode z left) middle right
    | z > y = Roots x y left middle (addnode z right)
    | otherwise = Roots x y left (addnode z middle) right
addnode y (Root x Empty Empty)
    | y > x = leaf2 x y
    | otherwise = leaf2 y x

-- Definition for my member function.

member :: Ord a => a -> BinTree a -> Bool
member z Empty = False
member z (Roots x y left middle right)
    | z == x || z == y = True
    | z < x = member z left
    | z > y = member z right
    | z > x && z < y = member z middle
member y (Root x Empty Empty)
    | y == x = True
    | otherwise = False

-- maketree function used for creating trees for testing.

maketree :: Ord a => [a] -> BinTree a
maketree [x] = leaf x
maketree (x:xs)=
    addnode x (maketree xs)

-- height function which uses the built max fucntion and maximum function
-- max is used for a Binary tree leaf while maximum is used for the 2 to 3 tree.

height :: BinTree a -> Int
height Empty = 0
height (Root _ left right) = 1 + max (height left) (height right)
height (Roots _ _ left middle right) = 1 + maximum [height left, height middle, height right]

-- Here is my prettyprint fucntion which is based on Solution 2 from this website https://copyprogramming.com/howto/nicely-printing-showing-a-binary-tree-in-haskell 
-- it uses a prettyprint_helper function defined below which add's padding and 'links'
-- for each branch of the tree recursively.

prettyprint (Roots x y left middle right) = putStrLn(unlines (prettyprint_helper (Roots x y left middle right)))

prettyprint_helper (Roots x y left middle right)
    = (show x ++ "," ++ show y) : (prettyprint_subtree left middle right)
        where
            prettyprint_subtree left middle right =
                ((pad "+- " "|  ") (prettyprint_helper right))
                    ++ ((pad "`- " "|  ") (prettyprint_helper middle))
                    ++ ((pad "`- " "   ") (prettyprint_helper left))
            pad first rest = zipWith (++) (first : repeat rest)

prettyprint_helper (Root x left right)
    = (show x) : (prettyprint_subtree left right)
        where
            prettyprint_subtree left right =
                ((pad "+- " "|  ") (prettyprint_helper right))
                    ++ ((pad "`- " "   ") (prettyprint_helper left))
            pad first rest = zipWith (++) (first : repeat rest)
prettyprint_helper (leaf)
    = ["nil"]


--inorder :: Show t => BinTree t -> [[String]]
--inorder (Root x Empty Empty) = 
--    let rootStr = show x
--    in [["nil " ++ rootStr ++ " nil"]]
--inorder (Root x Empty right) = 
--    let rootStr = show x
--    in [[rootStr ++ ""]] ++ inorder(right)
--inorder (Root x left Empty) = 
--    let rootStr = show x
--    in inorder(left) ++ [[rootStr ++ " nil"]] 
--inorder (Root x left right) =
--    let rootStr = show x
--    in inorder(left) ++ [[rootStr]] ++ inorder(right)