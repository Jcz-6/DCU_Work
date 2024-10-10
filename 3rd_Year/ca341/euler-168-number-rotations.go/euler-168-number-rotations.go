package main

import (
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func generateK(limit int, i int) int {
	//total := big.NewInt(0)
	x := big.NewInt(0)
	two := big.NewInt(2)
	one := big.NewInt(1)
	ten := big.NewInt(10)
	y := big.NewInt(int64(i))
	y2 := big.NewInt(int64(i))

	//fmt.Println(y)
	new_limit := big.NewInt(int64(limit))
	new_limit2 := big.NewInt(int64(limit))
	k := big.NewInt(0)
	//fmt.Println(k.Exp(ten, new_limit.Sub(new_limit, two), nil))
	k = k.Div(k.Mul(k.Exp(ten, new_limit.Sub(new_limit, two), nil), y.Add((y.Mul(ten, y)), one)),
		x.Add(x.Exp(ten, new_limit2.Sub(new_limit2, one), nil), y2))

	return int(k.Int64())
}

func generateX(limit int, i int, k int, total *big.Int) *big.Int {
	//fmt.Printf("%d\n", limit)
	zero := big.NewInt(0)
	one := big.NewInt(1)
	ten := big.NewInt(10)
	y := big.NewInt(int64(i))
	//k1 := big.NewInt(int64(k))
	k2 := big.NewInt(int64(k))
	//x := big.NewInt(0)
	m := big.NewInt(0)
	x2 := big.NewInt(0)
	new_limit := big.NewInt(int64(limit))
	//fmt.Printf("%d\n", k1)
	//fmt.Printf("%d\n", k2)
	//fmt.Printf("%d\n", x)
	//fmt.Printf("%d\n", m)
	//fmt.Printf("%d\n", x2)
	for j := 1; j <= k; j++ {
		z := big.NewInt(int64(j))
		x2, m = x2.DivMod(x2.Mul(x2.Sub(x2.Exp(ten, new_limit.Sub(new_limit, one), nil), z), y),
			(k2.Sub(k2.Mul(ten, z), one)), m)
		//fmt.Println(dv)
		//fmt.Println(x2)
		//fmt.Println(m)

		if m.Cmp(zero) == 0 {
			total.Add(total, (x2.Add(x2.Mul(x2, ten), y)))
		}
	}

	return zero
}

func main() {
	//var nums []int
	//i := 1
	//find the nth number imnputed
	total := big.NewInt(0)
	limit := os.Args[1]
	limit1, err := strconv.Atoi(limit)
	for x := 2; x <= limit1; x++ {
		for i := 0; i < 10; i++ {
			k := generateK(x, i)
			generateX(x, i, k, total)

		}
	}
	fmt.Println(total)

	//fmt.Printf("%d\n", total)
	/*for i := 1; i < len(primes_check); i++ {
		println(primes_check[i])
	}*/

	/*for i := 1; i < len(all_primes); i++ {
		fmt.Printf("%d\n", all_primes[i])
	}*/
	if err != nil {
		fmt.Println(err)
	}

}
