
// Arrays
const chaiFalvours:string[]=["Masala","Adrak"]
const chaiPrice:number[]=[10,20];

const rating:Array<number>=[4.5,9,0,7];

// Array of Object
type Chai={
  name:string;
  price:number;
}
const menu:Chai[]=[
  {
    name:"Masala",price:15
  },
    {
    name:"Normal",price:12
  }
]

// ReadOnly arrays 
const cities:readonly string[]=["Delhi","Jaipur"];
// cities.push("Pune") //error

const table:number[][]=[
  [1,2,3],
  [4,5,6]
]


// tuples, do we have tuples in a JS , i do not think so array handles everthing , well in the end array also obj with number index and value , js is just obj thing anyway 
let chaiTuple:[string,number];
chaiTuple=["Masala",20];
// chaiTuple=[20,"Masala"]; //order matters 


// readonly tuples 
const locations:readonly [number,number]=[28.66,33.22];
// locations.push() //error

// named tuples
let chaiTuple2:[type:string,price:number]=["Masala",20];

// does tuple is array like they it's methods 


// enum
enum CupSize{
  SMALL,
  MEDIUM,
  LARGE
}

const size=CupSize.MEDIUM;

enum ChaiType{
  MASALA="masala",
  GINGER="ginger"
}

function makingChai(type:ChaiType){
  console.log(`Making the ${type}`);
}


makingChai(ChaiType.MASALA)

// const enum
const enum Sugars{
  LOW=1,
  MEDIUM=2,
  HIGH=3,
}