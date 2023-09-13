x = {"person":[
    {name:"jakub", age: 12, address: "dn", sayHello: function(){
        return "Hi my name is:" + this.name;
    }},
    {name:"josh", age: 11, address: "dn_xd", sayHello: function(){
        return "Hi my name is:" + this.name;
    }},
]};

for (let key in x["person"]){
	// key is the dictionary key , e.g. "Name"
  // person[key] is the value assigned to that key, e.g. "Michael"
	console.log(x["person"][key]);
}

for (let i = 0; i < x["person"].length; i++) {
    console.log(JSON.stringify(x["person"][i].sayHello()));
}

// use stringify to change into a string important for html