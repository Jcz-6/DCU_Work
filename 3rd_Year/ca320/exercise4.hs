-- CA320 Computability and Complexity
--
-- Jakub Czerniejewski

myAppend :: [a] -> [a] -> [a]
myAppend x [] = x
myAppend x (y:ys) = 
    let z = x ++ [y]
    in myAppend z ys

myHead :: [a] -> a
myHead [] = error "empty list"
myHead (x:xs) = x 

myLast :: [a] -> a
myLast [] = error "empty list"
myLast [x] = x
myLast (x:xs) = myLast xs

myTail :: [a] -> [a]
myTail [] = error "empty list"
myTail (x:xs) = xs

myInit :: [a] -> [a]
myInit [] = error "empty list"
myInit [x] = []
myInit (x:xs) = x : myInit xs

myLength :: [a] -> Int
myLength [x] = 1
myLength [] = 0
myLength (x:xs) = 1 + myLength xs

myReverse :: [a] -> [a]
myReverse [] = []
myReverse (x:xs) = myReverse xs ++ [x]

myConcat :: [[a]] -> [a]
myConcat [] = []
myConcat (x:xs) = x ++ myConcat(xs)

mySum :: Num a => [a] -> a
mySum [] = 0
mySum (x:xs) = x + mySum xs

myProduct :: Num a => [a] -> a
myProduct [] = 1
myProduct (x:xs) = x * myProduct xs

myMinimum :: Ord a => [a] -> a
myMinimum [x] = x
myMinimum (x:xs) 
    | x < myMinimum xs = x 
    | otherwise = myMinimum xs

myMaximum :: Ord a => [a] -> a
myMaximum [x] = x
myMaximum (x:xs) 
    | x > myMaximum xs = x 
    | otherwise = myMaximum xs

myElem :: Eq a=> a -> [a] -> Bool
myElem x [] = False
myElem x (y:ys)
    | x == y = True
    | otherwise = myElem x ys

myDelete :: Eq a=> a-> [a] -> [a]
myDelete x (y:ys)
    | x == y = ys
    | x == myLast (y:ys) = myInit (y:ys)

myDelete x (y:z:yz)
    | x == z = y:yz
    | otherwise = y:z: myDelete x yz

myUnion :: Eq a=> [a] -> [a] -> [a]
myUnion [] [] = []
myUnion x [] = x
myUnion (x:xs) (y:ys)
    | myElem y (x:xs) = 
    let new_list = myDelete y (y:ys)
    in myUnion (x:xs) new_list
    | myElem y (x:xs) == False =
    let updated_x = (x:xs) ++ [y]
    in myUnion updated_x ys

myIntersect [] _ = []
myIntersect (x:xs) y = if myElem x y
    then x:(myIntersect xs y)
    else (myIntersect xs y)


-- | myElem x (y:ys) = 
-- let new_list = myDelete x (y:ys)
-- in myUnion (x:xs) new_list
-- | myElem x (y:ys) == False = myUnion (xs ++ [x]) (y:ys)
myDn :: [Int]
myDn = [x | x <- [3..100], x `mod` 3 == 0, odd x ]

sum (filter even (map (^2) [1..100]))

myConcat :: Ord a => [[a]] -> [a]
myConcat [] = []
myConcat (x:xs) = foldr (:) (myConcat xs) x

isPalindrome :: (Eq a) => [a] -> Bool
isPalindrome x:xs = (x == last xs) && isPalindrome (init xs)