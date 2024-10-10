import kotlin.math.pow

class Problem119 {
    //class mathod to check for the sum of the digits
    //being equal to a number raised for some power
    //Even a30 does not surpass a power of 10
    fun check(n: Int): Int {
        val num = n.toString()
        var tot = 0

        for (i in num) {
            tot += i.toString().toInt()
        }

        if (n % tot == 0) {
            var j = 0
            while (tot.toDouble().pow(j) != n.toDouble() && j < 10) {
                j++
            }
            if (tot.toDouble().pow(j) == n.toDouble()) {
                return n
            }
        }
        return -1
    }

    //uses the above function to find elements within the range provided
    fun cal(n: Int): List<Int> {
        val nums = mutableListOf<Int>()
        var i = 1

        while (nums.size != n) {
            val result = check(i)
            if (result != -1) {
                if (i > 80) {
                    nums.add(i)
                }
            }
            i++
        }

        return nums
    }
}

fun main(args: Array<String>) {
    val limit = Integer.parseInt(args[0])
    val problem = Problem119()
    val nums = problem.cal(limit)


    println(nums[limit-1])
}
