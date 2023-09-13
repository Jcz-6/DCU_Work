
function add(x, y) {
    let z = x + y;
    return z;
}






function printer(callback, x, y) {
    return(callback(x,y));
}

console.log(printer(add, 5, 10));