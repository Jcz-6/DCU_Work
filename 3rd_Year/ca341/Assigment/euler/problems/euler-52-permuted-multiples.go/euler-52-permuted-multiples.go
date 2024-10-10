package main
/*
Imported libraries 
fmt -> provides the functionality to format the printing and scanning
sort -> Sorts slices or user defined collections
strconv -> convert between data types
os -> allows for imput of command line arguments
*/
import (
		"fmt"
		"sort"
		"strconv"
        "os"
)

/*
function that takes an integer and returns true if it satisfies the condition 
that the number inputed consists of the same digits after the operations below
*/
func cal(i int) bool {
    a := strconv.Itoa(i)
    b := strconv.Itoa(i * 2)
    c := strconv.Itoa(i * 3)
    d := strconv.Itoa(i * 4)
    e := strconv.Itoa(i * 5)
    f := strconv.Itoa(i * 6)

    //uses function to ensure each number the same after arithmetic operation and sorting
    return areEqualSortedLists([]rune(a), []rune(b)) &&
        areEqualSortedLists([]rune(b), []rune(c)) &&
        areEqualSortedLists([]rune(c), []rune(d)) &&
        areEqualSortedLists([]rune(d), []rune(e)) &&
        areEqualSortedLists([]rune(e), []rune(f))
}
/*
goes through each item in the list to make sure it is the same
for all elements in the list
*/
func areEqualSortedLists(list1, list2 []rune) bool {
    sort.Slice(list1, func(i, j int) bool { return list1[i] < list1[j] })
    sort.Slice(list2, func(i, j int) bool { return list2[i] < list2[j] })

    if len(list1) != len(list2) {
        return false
    }

    for i := range list1 {
        if list1[i] != list2[i] {
            return false
        }
    }

    return true
}

/*
Main body function for code execution
*/
func main(){
    //take in user input for command line
    limit, _ := strconv.Atoi(os.Args[1])
	var i, count int = 1, 0

    //nth number based on the input of the user
	for count < limit {
        //if 1 is inputed it finds the first numebr that satisfies this condition
		if cal(i) {
			count++
		}
		i++
	}
	fmt.Println(i)
}
