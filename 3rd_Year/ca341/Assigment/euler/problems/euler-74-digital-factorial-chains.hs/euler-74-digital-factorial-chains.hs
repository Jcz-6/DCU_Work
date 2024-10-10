-- Import for getting command line input
import System.Environment (getArgs)

factorial :: Integer -> Integer
factorial 0 = 1
factorial x = x * (factorial (x-1))

digits :: Integer -> [Integer]
digits 0 = []
digits x = 
    let remainder = x `mod` 10
        nten =  div x 10
    in digits(nten) ++ [remainder]

sumFactorials :: [Integer] -> Integer
sumFactorials [x] = factorial x
sumFactorials (x:xs) =
    (factorial x) + sumFactorials(xs)

digitalFactorialChain :: Integer -> [Integer] -> Integer
digitalFactorialChain x y 
    | elem x y = fromIntegral(length y)
    | otherwise = digitalFactorialChain (sumFactorials(digits x)) (y ++ [x])

digitalFactorialChainCount :: Integer -> Integer -> Integer -> Integer
digitalFactorialChainCount start target count
    | start == 1 = count
    | otherwise = digitalFactorialChainCount (start - 1) target (if target == digitalFactorialChain start [] then count + 1 else count)


stringToInt :: String -> Integer
stringToInt s = read s

charToString :: Char -> String
charToString s = [s]


{-
Main function 
-}
main :: IO ()
main = do
    -- Recieve arguents from command line
    args <- getArgs
    let start = stringToInt (head args)
    let target = stringToInt(last args)
    let result = digitalFactorialChainCount start target 0
    putStrLn $ show (result)