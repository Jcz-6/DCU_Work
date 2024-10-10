import java.math.BigInteger

//class is passed a value on initialization as BigInteger required String
class problem48(private val mod: BigInteger) {
    private var total: BigInteger = BigInteger.ZERO

    fun calculateTotal(n: Int) {
        for (i in 1..n) {
            //every interger in range is raised to the power of itself
            val exp = BigInteger.valueOf(i.toLong())
            val result = exp.pow(i)
            total = total.add(result)
        }

        total = total.mod(mod)
    }

    //due to type errors new method is created to return the answer
    fun getTotal(): BigInteger {
        return total
    }
}

fun main(args: Array<String>) {
    val limit = Integer.parseInt(args[0])
    val mod = BigInteger("10000000000")
    //mod is set to find last 10 digits
    val calculator = problem48(mod)

    calculator.calculateTotal(limit)
    val total = calculator.getTotal()
    println(total)
}
