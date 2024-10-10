
import kotlin.math.sqrt
import kotlin.math.pow
// uses mobius function to determine wether number is square free
class SquareFree (val threshold : Int){
    private var primes_check = MutableList(threshold) { true }
    public var primes_squared : MutableList<Int> = mutableListOf()

    /*
    Our primes function uses the Sieve of Eratosthenes to generate primes up to limit which is the
    the threshold X/2 it also takes in a initialized boolean array of size X,
    and it returns an array of those primes.
    */
    fun primes(){
        primes_check[0] = false
        primes_check[1] = false
        var i: Int = 0
        while(i <= threshold/2){
            if(primes_check[i]){
                primes_squared.add((i*i))
                var j: Int = 2*i
                while(j < threshold){
                    
                    primes_check[j] = false
                    j += i
                }
            }
            i += 1
        } 
    }
        /*
        The mobius function checks wether a number is divided by a squared prime
        this is a modified version which doesnt care if it has multiple squared prime factors or not
        */

    public fun mobius(first : Int):Boolean{
        /*if(first % 2 == 0){
            var second = first / 2
            if(second % 2 == 0){
                return false
            }
        }*/
        var i : Int = 0
        while(i < (primes_squared.size - 1)){
            //println(primes_squared[i])
            if(first % primes_squared[i] == 0 ){
                return false
            }
            i += 1
        }
        return true
    }
    /*
    sfree is basically a runner function for the code as it inputs every number
    from 1 to the threshold
     */

    fun sfree():Long{
        var total:Long = 0
        for (i in 1..threshold) {
            //println(mobius(i))
            //println(i)
            if(mobius(i)){
                total +=1
            }
        }
        return total
    }
}

/*
Our main function converts the comand line arguement which is a string to an int
which is the threshhold and creates and instance of SquareFree
 */

fun main(args: Array<String>) {
    val number:Int = Integer.parseInt(args[0])
    val test = SquareFree(number)
    test.primes()
    println(test.sfree())
    //test.all_primes.forEach { println(it) }
}