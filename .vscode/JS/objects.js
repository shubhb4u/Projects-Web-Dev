var person = {
    name:"Abhishek",
    age:  23,
    phone : 3242342,
    isMale: true,
    height: "170 cm",
    "school name": "JVM" //  if there is space in between then use double quotes in key
}

console.log(person);

console.log(person.name);
console.log(person.age);
console.log(person["school name"]); // These keys use square brackets instead of .operator


var captainAmerica = {
    firstName: "Steve",
    lastName: "Rogers",
    friends: ["Bucky", "Tony Stark", "Bruce Banner"],
    age: 122,
    isAvenger: true,
    address: { // Nesting of objects!!!! 
        state: "Manhattan",
        city: "New York",
        country: "USA"
    },
    sayHi: function () {
        console.log(this);
        console.log(`Hello my name is ${this.firstName}`);
    }
};

var users = {
    name: "John",
    age:30
}

let abc = "age";
console.log(users.name);
console.log(users.abc); //-> undefined
console.log(users[abc]); 

// let fruit = prompt("Which fruit to buy?");
//value substitute
// let bag = {
//     [fruit]: 5, // the name of the property is taken from the variable fruit
// };

// alert(bag[fruit]); //5

let fruitName = "apple";
//expression evaluate
let items = {
    [fruitName + "computers"]: 4
};

//property value shorthand
var computerBrand= "apple";
var processor = "M2 sillicon";
var ram = "16GB"

// var specification = {
//     computerBrand: computerBrand, //-> computerBrand:"apple"
//     processor: processor,
//     ram:ram
// }

//if you want to keep the name of key in object same as variable then we can use shorthand property
var specification = {
  computerBrand,
  processor,
    ram,
    ssd: "512GB",
  abc:undefined
};

console.log(specification);


console.log("ram" in specification); //true
if (specification["ram"]){
    console.log(true);
}; // 16GB

console.log("abc" in specification);
if (specification.abc) {
    //do something
    console.log(true);
}
else {
    console.log(false);
}

