
person = [
    {name:"jakub"},
    {name:"josh"}
];

for (let i = 0; i < person.length; i++) {
    console.log(JSON.stringify(person[i]["name"]));
    
}