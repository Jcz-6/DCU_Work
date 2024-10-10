package main
/*
Import needed libraries
fmt is imported to print the output
os is used for getting command line arguments
strconv is used to convert strings to integers
*/
import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	u, v := 2, 1
	perimeters := 0
	L, _ := strconv.Atoi(os.Args[1])


	/*
	we search for all satisfiable conditions for a triangle
	we do this by preseetting the sides of the triangle
	when found we add the perimeters
	*/
	for int64(u) < int64(float64(L)*0.5/4) {
		perimeter1 := 4 * u * u
		perimeter2 := 2 * (u + 3*v) * (u + 3*v)

		if perimeter1 < L {
			perimeters += perimeter1
		}

		if perimeter2 < L {
			perimeters += perimeter2
		}

		u, v = 2*u+3*v, u+2*v
	}

	fmt.Println(perimeters)
}
