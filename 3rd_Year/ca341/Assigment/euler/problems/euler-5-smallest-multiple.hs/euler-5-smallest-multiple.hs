-- import needed for getting the command line arguments
import System.Environment (getArgs)

{- 
function problem5 is made that takes 2 arguments of type int
and returns 1 argument of type int.
The first argument is the nth number we want to find and the second argument
is the limit to the numbers that it has to devide.
-}
{-
Below the function continues to recusivly call itself until
n mod y is 0 with y being all the numbers from 1 to the 
specified argument. n is incremented till this is satisfied.
-}

problem5 :: Int -> Int -> Int
problem5 n x = if all (\y -> n `mod` y == 0) [1..x]
                    then n
                    else problem5 (n + 1) x

{-
Main function used for instruction for when we compiled
and also for getting command line arguments
-}
main :: IO ()
main = do
    args <- getArgs
    -- we declare x as the argument passed as arg gets converted into a int
    let x = case args of
                [arg] -> read arg :: Int
    -- Let result be the function of 1 to the command line argument x
    let result = problem5 1 x
    putStrLn $ show result
