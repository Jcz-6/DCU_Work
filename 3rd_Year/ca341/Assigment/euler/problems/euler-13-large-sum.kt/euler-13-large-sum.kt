import java.io.*
import java.math.BigInteger

/*

*/
class Problem13(private val filename: String) {
    private var sum: BigInteger = BigInteger.ZERO

    //class method to read the numbers from the file and sum them
    fun cal() {
     //basic try catch block for opening and readign a file
    val reader = BufferedReader(FileReader(File(filename)))
    var line: String?
    while (reader.readLine().also { line = it } != null) {
        val num = BigInteger(line)
        sum += num
    }
    reader.close()
        
    }

    //class method to return the first 10 digits of the sum
    fun answer() {
        val answer = sum.toString()
        println(answer.substring(0, 10))
    }
}

fun main(args: Array<String>) {
    //pass command line arguments to the class
    val problem = Problem13(args[0])
    //call method to calculate the sum
    problem.cal()
    //call method to print the first 10 digits of the sum
    problem.answer()
}
