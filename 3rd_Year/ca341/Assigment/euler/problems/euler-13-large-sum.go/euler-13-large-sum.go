package main
/*
import needed libraries
bufio is used for handling the files
fmt is used for printing
math/ibig is used for the handling of the numbers as regular int data type is not large enough
os is used for the reading in of the command line arguments
*/
import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)
/*
function below is used to calculate the main part of the problem
-> take in and reads the file summing all the 50 digit numbers inside
function returns error and big integer
*/
func cal(filename string) (*big.Int, error) {
	//open the file passed to the function
	file, _ := os.Open(filename)


	defer file.Close()

	//Variable declared of type bigInt for storing al the added numbers
	sum := new(big.Int)
	//sncanner for taking in file input
	scanner := bufio.NewScanner(file)

	//for loop to scan input from file
	for scanner.Scan() {
		line := scanner.Text()
		num := new(big.Int)

		// Parse the line as data type big.Int
		_, success := num.SetString(line, 10)
		if !success {
			return nil, fmt.Errorf("failed to parse number from line: %s", line)
		}

		//add the number to the sum using big.Int addition
		sum.Add(sum, num)
	}
	
	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return sum, nil
}

func main() {
	//file for input
	filename := os.Args[1]

	//function is called using the file from command line as input
	sum, _ := cal(filename)

	//convert to string to find first 10 digits
	answer := sum.String()
	fmt.Println(answer[:10])
}
