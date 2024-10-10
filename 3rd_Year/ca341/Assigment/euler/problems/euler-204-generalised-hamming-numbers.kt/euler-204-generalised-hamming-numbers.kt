/*This is the solution for euler-204
using kotlin */

import kotlin.math.pow
import kotlin.math.ln //Here are the functions from the
                    //kotlin math libary we will need


/*This is the class definition for our problem
it consists of two mutable list a primes functions which calculates
all the primes to N
and the greater hamming recursive functions which calculates our output*/
class GHammingNums(val number: Int, val ghm: Int){
    private var primes_check = MutableList(ghm) { true }
    public var all_primes : MutableList<Int> = mutableListOf()


    fun primes(){
        primes_check[0] = false
        primes_check[1] = false
        var i: Int = 0
        while(i <= number){
            if(primes_check[i]){
                all_primes.add(i)
                var j: Int = 2*i
                while(j < ghm){
                    
                    primes_check[j] = false
                    j += i
                }
            }
            i += 1
        } 
    }
    /*
    this function calculated the humming numbers up to N recursively by
    checking each multiple combination of the primes.
    */
    
    public fun greaterHamming(limit : Int, position : Int):Int{
        if(position == 0){
            //println(ln(limit.toDouble()) / ln(2.toDouble()))
            return (ln(limit.toDouble()) / ln(2.toDouble())).toInt() + 1
        }
        if(limit == 0){
            return 0
        }
        return greaterHamming(limit, position - 1) + greaterHamming(limit/all_primes[position], position)
    }
}

/*Our main functions takes in 2 command line arguments X and N
X number is the power of 10 from which we are getting the amount of humming numbers
ghm is 10 to the X while we get all the prime numbers till N */
fun main(args: Array<String>) {
    val ghm:Int = (10.toDouble().pow((Integer.parseInt(args[0]).toDouble()))).toInt()
    val number:Int = Integer.parseInt(args[1])
    val test = GHammingNums(number, ghm)
    test.primes()
    println(test.greaterHamming(ghm, (test.all_primes.size - 1)))
    //test.all_primes.forEach { println(it) }
}