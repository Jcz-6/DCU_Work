package main

/*
Import needed packages for solving the problem at hand
fmt -> used for printing the output
math -> used for handling the math operations
strconv -> used for converting strings to integers
os -> used for getting command line input
*/

import (
	"fmt"
	"math"
	"strconv"
	"os"
)

/*
Function below takes one argument, an integer that
is converted to a string for each digit of the number
to check that the sum of the digits raised to some power
returns the original number rerutning the number if so
else returns -1
*/
func check(n int) int {
	num := strconv.Itoa(n)
	tot := 0

	//for loop that adds each digit handling ascii value conversion
	for _, i := range num {
		tot += int(i - '0')
	}
	if n%tot == 0 {
		j := 0
		//for loop to raise the digit to some power from 0 to 10
		for math.Pow(float64(tot), float64(j)) != float64(n) && j < 10 {
			j++
		}
		//return the number if its equal to the number passed
		if math.Pow(float64(tot), float64(j)) == float64(n) {
			return n
		}
	}

	return -1
}

func main() {
	var nums []int
	i := 1

	//find the nth number imnputed
	limit := os.Args[1]
    limit1, _ := strconv.Atoi(limit)

	//-> for loop that gets a list of numbers that satisfy the conditions
	//-> of the function above and gets a list of these numbers of a length specified
	//-> by the user
	for len(nums) != limit1 {
		result := check(i)
		if result != -1 {
			//start at 80 as a1 = 81
			if i > 80 {
				nums = append(nums, i)
			}
		}
		i++
	}

	//print the last elemnt of the list or otherwise know as the
	//number specified by the user on the command line
	fmt.Printf("%d\n", nums[limit1-1])
	
}
