package main

/*
imported libraries needed
fmt used for printing the output
math/big used for data type of BigInt for storing the variables
os is used for getting command line input
strconv used for converting data types
*/
import (
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func main() {
	//modulus to find the last 10 digits
	mod := big.NewInt(10000000000)

	//total declared as type bigInt for storing the final answer
	total := big.NewInt(0)
	limit := os.Args[1]
	//take command line arguments and convert to int	
	limit1, _ := strconv.Atoi(limit)

	/*
	for loop that finds the sum of the numbers from 1
	up to the number inputted by the user all raised to the power of
	themselves.
	*/
	for i := 1; i <= limit1; i++ {
		exp := big.NewInt(int64(i))
		exp.Exp(exp, exp, nil)
		total.Add(total, exp)
	}
	//BigInteger arithmetic operation for modulo
	total.Mod(total, mod)
	fmt.Println(total)
}
