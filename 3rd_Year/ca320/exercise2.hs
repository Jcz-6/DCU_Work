-- CA320 Computability and Complexity
--
-- Jakub Czerniejewski

diff :: Int -> Int -> Int
diff x y = abs (x-y)

isSum :: Float -> Float -> Float -> Bool
isSum x y z = x + y > z && x + z > y && z + y > x

triangleArea :: Float -> Float -> Float -> Float
triangleArea x y z = 
    if isSum x y z
        then
            let s = (x + y + z) / 2
            in sqrt (s*(s-x)*(s-y)*(s-z))
        else
            error "Not a triangle!"

    

--isSum :: Float -> Float -> Float -> Bool
--isSum x y z = x + y == z || x + z == y || z + y == x

