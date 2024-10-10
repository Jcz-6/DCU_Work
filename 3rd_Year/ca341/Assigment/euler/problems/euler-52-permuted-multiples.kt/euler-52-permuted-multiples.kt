class problem52{
    //class function that takes an integer and return a boolean
    //converts the int into a list containing strings
    //list is sorted and then compared
    fun cal(i: Int): Boolean {
        var a = i.toString()
        var b = (i * 2).toString()
        var c = (i * 3).toString()
        var d = (i * 4).toString()
        var e = (i * 5).toString()
        var f = (i * 6).toString()

        return (a.toList().sorted() == b.toList().sorted() &&
            b.toList().sorted() == c.toList().sorted() &&
            c.toList().sorted() == d.toList().sorted() &&
            d.toList().sorted() == e.toList().sorted() &&
            e.toList().sorted() == f.toList().sorted())
    }
}



fun main(args: Array<String>){
    var problem = problem52()
    val limit = Integer.parseInt(args[0])
    var i = 1
    var count = 0
    //as we are searching for the smallest value we increment i till the first satifyable value
    while (count < limit) {
        if(problem.cal(i)){
            count++
        }
        i++
    }
    println(i)
}

