data BinTree t = Empty 
    | Root t (BinTree t) (BinTree t)
    deriving (Eq, Ord, Show)

myTree = Root 5 (Root 1 (Empty) (Root 3 Empty Empty))
 (Root 7 Empty Empty)

--leaf :: a -> BinTree a
leaf x = Root x Empty Empty

myTree1 = Root 5 (Root 1 (Empty) (leaf 3))
 (leaf 7)

addnode :: Ord a => a -> BinTree a -> BinTree a
addnode y Empty = leaf y
addnode y (Root x left right)
    | y == x = Root y left right
    | y < x = Root x (addnode y left) right
    | y > x = Root x left (addnode y right)

maketree :: Ord a => [a] -> BinTree a
maketree [x] = leaf x
maketree (x:xs)=
    addnode x (maketree xs)
    
--inorder :: BinTree a -> [a]
--inorder (Root x Empty Empty) = [x]
--inorder (Root x Empty right) = [x] ++ inorder(right)
--inorder (Root x left Empty) = inorder(left) ++ [x]
--inorder (Root x left right) =
--    inorder(left) ++ [x] ++ inorder(right)

inorder :: Show t => BinTree t -> [String]
inorder (Root x Empty Empty) = 
    let rootStr = show x
    in ["nil " ++ rootStr ++ " nil"]
inorder (Root x Empty right) = 
    let rootStr = show x
    in ["nil " ++ rootStr] ++ inorder(right)
inorder (Root x left Empty) = 
    let rootStr = show x
    in inorder(left) ++ [rootStr ++ " nil"] 
inorder (Root x left right) =
    let rootStr = show x
    in inorder(left) ++ [rootStr] ++ inorder(right)

--prettyPrint :: Show t => BinTree t -> IO ()
--prettyPrint tree = putStrLn (unlines (inorder tree))

-- unlines concats a list with newlines
prettyprint (Root x left right) = putStrLn(unlines (prettyprint_helper (Root x left right)))
prettyprint_helper (Root x left right)
    = (show x) : (prettyprint_subtree left right)
        where
            prettyprint_subtree left right =
                ((pad "+- " "|  ") (prettyprint_helper right))
                    ++ ((pad "`- " "   ") (prettyprint_helper left))
            pad first rest = zipWith (++) (first : repeat rest)
prettyprint_helper (leaf)
    = ["nil"]

--mpsort :: Ord a => [a] -> [a]
--mpsort x =
--    inorder(maketree x)

preorder :: BinTree a -> [a]
preorder (Root a Empty Empty) = [a]
preorder (Root x Empty right) = [x] ++ preorder(right)
preorder (Root x left Empty) = [x] ++ preorder(left)
preorder (Root x left right) = [x] ++ preorder left ++ preorder right

--hosort :: (a -> a -> Bool) -> [a] -> [a]
--hosort op [x] = [x]
--hosort op (x:y:zz) 
--    | x `op` y =  [x]
--    | otherwise = hosort op (y:zz)S

