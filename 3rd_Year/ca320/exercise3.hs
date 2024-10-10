-- CA320 Computability and Complexity
--
-- Jakub Czerniejewski

isPalindrome :: Eq a => [a] -> Bool
isPalindrome [] = False
--isPalindrome a = length a == 1
isPalindrome a = 
    if head a == last a && length a > 2
        then let shorter = take (length (tail a) - 1) (tail a)
            in isPalindrome shorter
    else if length a == 1
        then True
    else
        False

shortest :: [[a]] -> [a]
shortest [[a]] = [a]
shortest (x:y:xs) 
    | length x > length y = shortest (y:xs)
    | otherwise = shortest (x:xs)

type Poly = [Int]
sumPoly :: Poly -> Poly -> Poly --Try with accumulator
sumPoly [x] [] = [x]
sumPoly [] [y] = [y]
sumPoly [] [] = []
sumPoly (x:xs) (y:ys) = x + y: sumPoly xs ys

evalPoly :: Int -> [Int] -> Int
evalPoly x [y] = y
evalPoly x (y:ys) = y + x * evalPoly x ys



--get lenght of each remap to a new list or just a simple recursive call
--maybe a accumulator