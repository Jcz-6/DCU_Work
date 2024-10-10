-- Imports needed for sorting elements and getting command line arguments
import System.Environment
import Data.List

{-
This function takes one argument 
and integer and returns a boolean value
based on the fact if the number passed contains the
same digits after being multiplied my the numbers from 1 to 6
-}
problem52 :: Int -> Bool
problem52 i =
    let a = sort $ show i
        b = sort $ show (i * 2)
        c = sort $ show (i * 3)
        d = sort $ show (i * 4)
        e = sort $ show (i * 5)
        f = sort $ show (i * 6)
        --Returns true if all the numbers are equal
    in a == b && b == c && c == d && d == e && e == f

{-
The function below takes to arguments, an integer
the first being the nth number we want to find that
satisfies the condition and the integer we increment
till the condition of problem52 is true
-}
findSmallest :: Int -> Int -> Int
findSmallest limit i
    | limit == 0 = i - 1
    -- Recursively call the function incrementing 1 till we return true
    | problem52 i = findSmallest (limit - 1) (i + 1)
    | otherwise = findSmallest limit (i + 1)

main :: IO ()
main = do
    -- Get command line argument
    args <- getArgs
    -- cast argument as type integer for use in function
    let limit = case args of
                    (x:_) -> read x :: Int
    let result = findSmallest limit 1
    print result
