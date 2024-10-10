/*This is the solution for euler-168
using kotlin */

/*
here are the libaries we need
 */

import kotlin.math.pow
import java.math.*
/*
class definition for Number Rotations
it takes a single variable threshold to contruct it 
total k and x are initialized to 0L (long)
 */

class NumberRotations(val threshold : Long){
    var total :Long = 0L
    var k :Long = 0L
    var x :Long = 0L

    /*
    generateK is our most important function in this code
    X is the number of digits D i-1 ie if our input number N is 123, X is 12_
    Y is the last possible digit ie the _ in 12_ its never 0
    to get the right rotation we need 10x + y has to be divisible by the original number N
     */
    fun generateK(threshold : Long){
    
        for (y in 0 until 10) {
            //println(10.toDouble().pow((threshold-2L).toDouble()).toInt() * (10 * x + 1))
        //println(10.toDouble().pow(((threshold-1L) + x).toDouble()).toInt())
            //k = 10.toDouble().pow((threshold-2L).toDouble()).toLong() * (10 * y + 1) / 
            //(10.toDouble().pow((threshold-1L).toDouble()).toLong() + y)
            //println(k)
            for (i in 1..9) {
               x = (y * ((10.toDouble().pow((threshold-1L).toDouble())).toLong() - i)) / (10L * i -1L)
                //print((10.toDouble().pow((threshold-1L).toDouble())).toLong())
                //println(x)
               if((y * ((10.toDouble().pow((threshold-1L).toDouble())).toLong() - i)) % (10L * i -1L) == 0L){
                  total += (10L * x + y)
               }
            }
        }
        
    }

    /*
    runner for generate K
    it gets all the numbers XX first then XXX then XXXX that are right rotations
    up to including the threshold
     */
    fun generateX(){
      for (i in 2..threshold) {
         generateK(i)
      }
    }
}


fun main(args: Array<String>) {
    val number:Long = args[0].toLong()
    val test = NumberRotations(number)
    test.generateX()
    println(test.total)
    
    //test.all_primes.forEach { println(it) }
}
