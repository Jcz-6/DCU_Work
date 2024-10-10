package main

import (
	"fmt"
	"os"
	"strconv"
)

func primes(primes_check []bool, limit int) []int {
	var all_primes []int
	primes_check[0] = true
	primes_check[1] = true
	for i := 0; i <= limit/2; i += 1 {
		//println(i)
		//println(i)
		if !primes_check[i] {
			all_primes = append(all_primes, i*i)
			for j := i * 2; j < limit; j += i {
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

func mobius(all_primes []int, check int) bool {
	for i := 0; i < len(all_primes); i++ {
		//fmt.Printf("%d\n", all_primes[i])
		//println(check)
		//println(check%all_primes[i] == 0)
		if check%all_primes[i] == 0 {
			return false
		}
	}
	println(check)
	return true
}

func main() {
	//var nums []int
	//i := 1

	//find the nth number imnputed
	limit := os.Args[1]
	limit1, err := strconv.Atoi(limit)
	primes_check := make([]bool, limit1+1)
	/*for i := 1; i < len(primes_check); i++ {
		println(primes_check[i])
	}*/
	all_primes := primes(primes_check, limit1)

	/*for i := 1; i < len(all_primes); i++ {
		fmt.Printf("%d\n", all_primes[i])
	}*/
	if err != nil {
		fmt.Println(err)
	}

	var total uint64
	for i := 1; i < limit1+1; i++ {
		if mobius(all_primes, i) {
			total += 1
		}
	}

	fmt.Printf("%d\n", total)

}
