package main
/*
Import packages needed for completing the problem
fmt -> used for formatting the printing
math/big -> used for handling large numbers and operations associated with them
os -> used for getting user input from command line
strconv -> used for converting strings to integers
*/
import (
	"fmt"
	"math/big"
	"os"
	"strconv"
)

/*
Function below takes in one integer and returns true
if the number is prime and ends in 7, false otherwise.
*/
func prime7(n int) bool {
	if n%2 == 0 || n%3 == 0 || n%5 == 0 {
		return false
	}
	return n%10 == 7
}

/*
Function that takes a list of integers and an integer
to check if the integer passed can be divided by any element
in the list of integers and returns true if it cant be divided
declaring it a ruff number
*/
func ruff(n []int, i int) bool {
	for _, v := range n {
		if i%v == 0 {
			return false
		}
	}
	return true
}

func main() {

    //list of primes generated always contain 2 and 5
	var primes = []int{2, 5}
	//take in user input
	limit, _ := strconv.Atoi(os.Args[1])

	//for loop to get the primes ending in 7 for the range the user provides
	for i := 0; len(primes) !=(limit+2); i++ {
		if prime7(i) {
			primes = append(primes, i)
		}

	}
    //range variable declared for product of primes
	dist := big.NewInt(1)
	//for loop that gets the product of the 7 primes to set the range
	for _, v := range primes {
		dist.Mul(dist, big.NewInt(int64(v)))
	}
	//answer variable made to store bigInteger answer
	answer := big.NewInt(0)
	//for loop that goes from 0 to the product of the 7 primes checking and summing the ruff numbers
	for i := big.NewInt(0); i.Cmp(dist)/* i < dist = -1*/ < 0; i.Add(i, big.NewInt(1)) {
		if ruff(primes, int(i.Int64())) && i.Int64()%10 == 7 {
            //sum up all the ruff numbers
			answer.Add(answer, i)
		}
	}
	//modulo is a problem specific solution 
	mod := big.NewInt(1000000007)
	fmt.Println(answer.Mod(answer, mod))
}
