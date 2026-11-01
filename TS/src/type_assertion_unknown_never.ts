let resposnse:any=42;

// so this is basically type assertion, like saying the value would be string 
let numericLength:number=(resposnse as string).length;

type Book={name:string}

let bookString='{"name":"Who Moved My cheese"}';

// let bookObject=JSON.parse(bookString) as Book;

// console.log(bookObject.name) // if we set the as Book then only it shows the name property , else no , as it is not sure that JAON wlll give name 


let bookObject=JSON.parse(bookString)
console.log(bookObject)  //now it si not moving 


// HTMLInputElmet to traet that are we getting is HTML element (data type for inputElemet i g)
const inputElement=document.getElementById("userName") as HTMLInputElement


// for any if i can set anything to it (doesn't check)
let value:any;
value="chai";
value=[1,2,3,4];
value=2.4;
value.toUpperCase();


// for unknown it is the same , but it checkes that is it event possible to use methods and propertis , just like any it does support all type of assignment
let value1:unknown;
value1="chai";
value1=[1,2,3,4];
value1=2.4;
// value1.toUpperCase(); // this gives the error 
if(typeof value1==="string")
value1.toUpperCase(); // if u want   to assign we can add type guards for it 



// try catch block
// so here we tried using the type guards like if error object is the instance of a Error class, we will get the error.message

try {
  
} catch (error) {
  if(error instanceof Error)
    console.log(error.message);
  console.log("Error: ",error);
  
}

// here do not get it all, but i g as we set it to the unknown the new varible was not sure about being string so we asserted i g , that is type assertion ?
const data:unknown="chai aur code"
const strData:string=data as string



// type never
// here is something intresting like see here we have two role and both have conditions , and we have wrote the role outside of those , not returning or printing , but it i sgiving the never as there nop value left , if i had another , it would shown that on hover there , do not really understamd tho 
type Role="admin" | "user"

// use of void?
function redirectBasedOnRole(role:Role):void{
  if(role==="admin")
    return console.log("redirecting to the Admin DashBoard");
  if(role==="user")
    return console.log("redirecting to the user dashboard");
  role;
}



function neverReturn():never{
  while(true){}
}