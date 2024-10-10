import java.math.BigInteger //Imported math library for
                            //Handling the large numbers as standard 
                            //Data types cant contain them

/*
Class definition for our problem consisting of
5 class methods 
*/
class RuffNumbers(val number: Int){
    var total = BigInteger("0")
    var sk_primes : MutableList<Int> = mutableListOf()

    //class function for calculating the primes
    //and adding them to the list sk_primes
    fun primes(){
        for(num in 2..100000){
            for(i in 2..num){
                if(num % i == 0){
                    if(num==i && (sk_primes.count() < number) && (i % 10 == 7)) sk_primes.add(num) else break
                } 
            }
        }
        //sk_primes.forEach{println(it)}
    }

    //function for getting the product of the numbers
    //in the list of sk_primes
    fun sk_product():Int{
        var product_sk: Int = 1
        sk_primes.forEach{product_sk *= it}
        return (product_sk * 10)
        //return 100
    }

    //funcion that takes an argument of type int 
    //and returns true or false depending if the number in the list
    //can divide the number passed
    fun primeMod(x : Int) : Boolean{
        var total: Int = 0
        sk_primes.forEach{
            if(x % it != 0)
            total += 1
        }
        if(total == sk_primes.count()){
            return true
        }
        return false
    }

    //class function that adds numbers to a list on the condition
    //that the number ends in 7
    fun myRange(x : Int) : MutableList<Int>{
        var range : MutableList<Int> = mutableListOf()
        var i = 7
        while (i < x){
            if(primeMod(i)){
                //println(i)
                range.add(i)
            }
            i += 10
        }
        return range
    }

    //class function to sum the numbers in the list of sk_product
    fun Ruff(){
        val nProduct = sk_product()
        //val range = 5..nProduct step 2 // make custom range
        val ruffNumbers : MutableList<Int> = myRange(nProduct)
        //for each loop to add each number
        ruffNumbers.forEach{
            total += BigInteger(it.toString())
        }
    }
    
}

fun main(args: Array<String>) {
        //set limit as argument passed
        val limit = args[0].toInt()
        //declare object and pass the limit as argument
        val test = RuffNumbers(limit)
        //run class functions
        test.primes()
        test.Ruff()
        println(test.total)
    }