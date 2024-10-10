/*
class Problem131 created consisting of the 
isPrime() class method to check for a prime number and
cubanPrime() class method to check for cuban prime numbers
*/
class Problem131{
    /*
    class method that takes one agument of type int
    and checks if that number is prime returning true
    if it is and false if not
    */
    fun isPrime(num: Int): Boolean {
        if (num <= 1) {
            return false
        } else if (num <= 3) {
            return true
        } else if (num % 2 == 0 || num % 3 == 0) {
            return false
        } else {
            var i = 5
            while (i * i <= num) {
                if (num % i == 0 || num % (i + 2) == 0) {
                    return false
                }
                i += 6
            }
        }
        return true
    }

    /*
    method that takes one integer and returns
    the generated cumban primes in the range provided
    */
    fun cubanPrimes(n: Int): Int{
        var numP = 0
        var num = 0
        var a = 0

        /*
        while loop that while less than the inputted number
        a count is create of all the cuban primes up to that number
        */
        while (num <= n) {
            // shortcut calculation found from cuban primes
            num = 3 * a * (1 + a) + 1
            if (isPrime(num)) {
                numP++
            }
            a++
        }
        return numP
    }
    

}

fun main(args: Array<String>) {
    //set the limit as the argument passed from command line
    val limit = args[0].toInt()
    val problem = Problem131()
    val answer = problem.cubanPrimes(limit)
    println(answer)
}
