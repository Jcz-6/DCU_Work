import System.Environment
import Data.List
import Data.Char (digitToInt)

{-
Function to calculate x^y mod m where x and y are equal
Function takes 3 arguments of type Integer and returns
one Integer.
-} 
powerMod :: Integer -> Integer -> Integer -> Integer
powerMod x y m = pow x y 1
    where
        pow _ 0 res = res
        pow base exp res =
            let res' = if even exp then res else (res * base) `mod` m
                base' = (base * base) `mod` m
                exp' = exp `div` 2
            in pow base' exp' res'

main :: IO ()
main = do
    args <- getArgs
    --Declare limit from command line argument
    let limit = read (head args) :: Integer

    -- Modulus to find the last 10 digits
    let modulus = 10^10

    -- Function to calculate the sum of numbers from 1 to n of i^i mod 10^10
    let sumOfPowers = foldl' (\acc i -> (acc + powerMod i i modulus) `mod` modulus) 0 [1..limit]

    print sumOfPowers
