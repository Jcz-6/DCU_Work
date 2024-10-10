package main

/*
Import needed packages for problem at hand
fmt imported for printing
os is used for getting command line input
strconv used for converting strings to ints
*/
import (
	"fmt"
	"os"
	"strconv"
)

/*
Function that takes an integer as an argument and returns
true if the integer is prime
*/
func isPrime(num int) bool {
	if num <= 1 {
		return false
	} else if num <= 3 {
		return true
	} else if num%2 == 0 || num%3 == 0 {
		return false
	} else {
		for i := 5; i*i <= num; i += 6 {
			if num%i == 0 || num%(i+2) == 0 {
				return false
			}
		}
	}
	return true
}

func main() {
	//using os to get command line input
	limit, _ := strconv.Atoi(os.Args[1])
	numP := 0
	var num int
	//for loop to count the numbers that satisfy the condition
	//of the problem of prime cube partnership
	for a := 0; num <= limit; a++ {
		//shortcut calculation found called cuban primes
		num = 3*a*(1+a) + 1
		if isPrime(num){
			numP++
		}
	}
	fmt.Printf("%d\n", numP)
}

//https://en.wikipedia.org/wiki/Cuban_prime