-- Import for getting command line input
import System.Environment (getArgs)

{- 
Function that takes an integer and returns an integer
that is the number of divisors the given number.
Here you can really see the power of haskell list comperhensions
-}
countDivisors :: Integer -> Integer
-- List comperhension to count the number of divisors of a numbers
countDivisors n = sum [1 | i <- [1..truncate (sqrt (fromIntegral n))], n `mod` i == 0] * 2 - (if isSquare n then 1 else 0)
  where
    -- Here we check to ensure the number is a perfect square
    isSquare x = truncate (sqrt (fromIntegral x)) ^ 2 == x

{-
Function to find consecutive integers with the same number of divisors
that takes 2 arguments of type integer, the first being the starting value
and the second being the limit.
-}
problem179 :: Integer -> Integer -> Integer
problem179 start limit = countConsecutiveDivisors start limit 0
  where
    {-
        Here we declare a new function that takes 3 integers for input
        n being the current number being evaluated, lim being the limit and
        count being the count of consecutive integers.
    -}
    countConsecutiveDivisors :: Integer -> Integer -> Integer -> Integer
    countConsecutiveDivisors n lim count
      | n + 1 < lim = let divisorsN = countDivisors n
                          divisorsNPlus1 = countDivisors (n + 1)
                          -- We recursivly call the function incrementing n and count by 1
                      in if divisorsN == divisorsNPlus1
                            then countConsecutiveDivisors (n + 1) lim (count + 1)
                            else countConsecutiveDivisors (n + 1) lim count
      | otherwise = count

{-
Main function 
-}
main :: IO ()
main = do
    -- Recieve arguents from command line
    args <- getArgs
    let limit = case args of
            -- cast arguments to correct type
            [arg] -> read arg :: Integer
            
    let result = problem179 1 limit
    putStrLn $ show result
