-- CA320 Computability and Complexity
--
-- Jakub Czerniejewski
cube :: Int -> Int
cube x = x * x * x
edge, volume :: Int
edge = 3
volume = cube edge
surfaceArea :: Float -> Float
surfaceArea r = 4.0 * pi * r^2