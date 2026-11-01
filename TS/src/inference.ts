// function makeChai(order:{type:string ;sugar:number ;strong:boolean}){
//   console.log("order is a: ",order);
// }

// function serveChai(order:{type:string;sugar:number;strong:boolean}){
//   console.log("order is a: ",order);
// }

// so here we used the same type for both rather than writing we can used like a 
type chaiOrder={
  type:string;
  sugar:number;
  strong:boolean
}

function makeChai(order:chaiOrder){
  console.log("order is a: ",order);
}

function serveChai(order:chaiOrder){
  console.log("order is a: ",order);
}



// type TeaRecipe={
//   water:number;
//   milk:number;
// }

// for above type to interface is a and that below class implements both type with objecta nd interface too
interface TeaRecipe{
  water:number,
  milk:number,
}

// so here our class implemneted the type TeaRecipe and simply used those 
class MasalaChai implements TeaRecipe{
  water=100;
  sugar=1;
}



// type CupSize="small" | "large"

// but here we got the errpr "A class can only implement an object type or intersection of object types with statically known members." so we can implement type , but of a object type(not like this one) ,so what we can do about it then , we use the interface 

interface CupSize{ 
  size:"small" | "large"
}


class Chai implements CupSize{
  size: "small" | "large"="large"
}

// let's see more about the types, tho use of interface is better 
// so | is called the union , tho union in set is look + , but here or maybe , well we got the types 
type TeaType="masala" | "ginger" | "lemon"

function orderChai(t:TeaType){
  console.log(t)
}

type BaseChai={teaLeaves:number}
type Extra={masala:number}

// this is called intersection , but it is more like and 
type MaslaaChai=BaseChai & Extra;

const cup:MaslaaChai={
  teaLeaves:2,
  masala:1,
}

type User={
  username:string,
  bio?:string
}

const u1:User={
  username:"Mahesh", bio:"mahesh-mane.onreder.com"
}
const u2:User={
  username:"kunal"
}

// readonly in a type

type config={
  readonly appName:string
  version:number,
}

const cfg:config={
  appName:"MaterJi",
  version:1
}
// cfg.appName="Dunno"; //can't assigna s readonly , as we have assigned once 