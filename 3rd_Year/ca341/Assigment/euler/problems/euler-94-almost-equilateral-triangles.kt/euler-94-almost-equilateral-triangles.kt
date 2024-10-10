import java.math.BigInteger //Imported math library for
                            //Handling the large numbers as standard 
                            //Data types cant contain them

/*
Class definition for our problem consisting of
2 class methods for calculating the number of almost equal
triangles and one for displaying the output
*/
class Problem94(private val limit: Int) {
    private var u: BigInteger = BigInteger.valueOf(2)
    private var v: BigInteger = BigInteger.ONE
    private var perimeters: BigInteger = BigInteger.ZERO

    /*
    class method to calculate all almost equilateral triangles
    up to the provided range by the user
    */
    fun cal() {
        //while loop for summing all the almost equilateral triangles
        while (u < BigInteger.valueOf((limit * 0.5 / 4).toLong())) {
            val perimeter1 = BigInteger.valueOf(4) * u * u
            val perimeter2 = BigInteger.valueOf(2) * (u + BigInteger.valueOf(3) * v) * (u + BigInteger.valueOf(3) * v)

            if (perimeter1 < BigInteger.valueOf(limit.toLong())) {
                perimeters += perimeter1
            }

            if (perimeter2 < BigInteger.valueOf(limit.toLong())) {
                perimeters += perimeter2
            }

            //unable to just reassign value like in Go due to BigInteger operations
            val newU = BigInteger.valueOf(2) * u + BigInteger.valueOf(3) * v
            val newV = u + BigInteger.valueOf(2) * v
            u = newU
            v = newV
        }
    }

    fun show() {
        println(perimeters)
    }
}

fun main(args: Array<String>) {

    //set the limit as the command line argument passed
    val limit = args[0].toInt()
    //create object of type Problem94 and pass the limit
    val problem = Problem94(limit)
    problem.cal()
    problem.show()
}
