(function(){
    
})();



function add(x, y) {
    let z = x + y;
    return z;
}

// this take a annonymous function as a input(callback)
function printer(callback, x, y) {
    return(callback(x,y));
}


// this is how to pass annonymous fuction directly to another fuction
console.log(printer((x,y)=>x+y, 2, 3));