/*This is the solution for euler-204
using go */

package main

/*
Here are all the go libaries that we need for this problem
*/
import (
	"fmt"
	"math"
	"os"
	"strconv"
)

/*
Our primes function uses the Sieve of Eratosthenes to generate primes up to N where N
is a integer it takes in a initialized boolean array of size 10 ^ X, ghm which is our threshold number
and a limit which is our N.
and it returns an array of those primes.
*/
func primes(primes_check []bool, limit int, ghm int) []int {
	var all_primes []int
	primes_check[0] = true
	primes_check[1] = true
	for i := 0; i <= limit; i += 1 {
		//println(i)
		//println(i)
		if !primes_check[i] {
			all_primes = append(all_primes, i)
			for j := i * 2; j < ghm; j += i {
				//println(j)
				primes_check[j] = true
				/*for i := 1; i < len(primes_check); i++ {
					println(primes_check[i])
				}*/
			}
		}
	}
	/*for i := 1; i < len(primes_check); i++ {
		println(primes_check[i])
	}*/
	return all_primes
}

/*
this function calculated the humming numbers up to N recursively by
checking each multiple combination of the primes.
*/

func greaterHamming(limit int, position int, primes []int) int {
	if position == 0 {
		return int(math.Log(float64(limit))/math.Log(float64(2))) + 1
	}
	if limit == 0 {
		return 0
	}
	return greaterHamming(limit, position-1, primes) + greaterHamming(limit/primes[position], position, primes)
}

/*Our main functions takes in 2 command line arguments X and N
X number is the power of 10 from which we are getting the amount of humming numbers
ghm is 10 to the X while we get all the prime numbers till N */

func main() {
	limit := os.Args[2]
	gmh := os.Args[1]
	limit1, err := strconv.Atoi(limit)
	gmh2, err2 := strconv.Atoi(gmh)
	gmh_actual := math.Pow10(gmh2)
	primes_check := make([]bool, int(gmh_actual))

	all_primes := primes(primes_check, limit1, int(gmh_actual))

	/*for i := 0; i < len(all_primes); i++ {
		println(all_primes[i])
	}*/
	println(greaterHamming(int(gmh_actual), (len(all_primes) - 1), all_primes))
	if err != nil {
		fmt.Println(err)
	}

	if err2 != nil {
		fmt.Println(err)
	}
}
