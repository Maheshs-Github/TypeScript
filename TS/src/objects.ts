const chai={
  name:"Masala Chai",
  price:20,
  isHot:true,
}

// do not really understood , we had the type syantx diff right?
let tea:{
  name:string;
  price:number;
  isHot:boolean;
}

tea={
  name:"Ginger Tea",
  price:20,
  isHot:true,
}


// types alias object, arebn't this is teh syntax, well let's see
type Tea={
  name:string,
  price:number,
  ingrediants:string[]
}

const adarkChai:Tea={
  name:"Adrak Chai",
  price:25,
  ingrediants:["dunno 1","dunno 2"]
}


// i do not really understad what sir were tryingto say here ,no clue 
type Cup={size:string}

let smallCup:Cup={size:"300ml"}

let bigCup:Cup={size:"500ml", material:"steel"}

smallCup=bigCup


type Brew={brewTime:number}
const coffee={brewTime:5,beans:"India"}

const chaiBrew:Brew=coffee
// this is ggiving error to m 


type User={
  username:string;
  password:string;
}

const u1:User={
  username:"mahesh",
  password:"12123"
}


// split out the types 
type Item={
  name:string;
  quantity:number;
}

type Address={
  street:string;
  pin:number;
}
type Order={
  id:string,
  items:Item[];
  address:Address;
}

// partial Updating 
type Chai={
  name:string;
    price:number;
  isHot:boolean;

}

const updateChai=(updates:Partial<Chai>)=>{
  console.log("Updating the Data With : "+updates)
}

updateChai({price:25})
updateChai({isHot:true})
updateChai({}) //can allow this too


// even tho our name was optinal bcoz of required , we need send it too 
type ChaiOrder={
  name?:string;
  quantity?:number
}

const placeOrder=(order:Required<ChaiOrder>)=>{
  console.log("order is a: "+order);
}

placeOrder({
  name:"Masala Chai",
  quantity:2
})

// with teh help of Pick we can only take the properties as we need 
type ChaiNew={
  name:string;
  price:number;
  isHot:boolean;
  ingrediants:string[]
}

type BasicChaiInfo=Pick<ChaiNew,"name" | "price">;

const chaiInfo:BasicChaiInfo={
  name:"Leamo Tea",
  price:30,
}


// there is omit too 
type ChaiNew2={
  name:string;
  price:number;
  isHot:boolean;
  secretIngrediants:string[]
}

type BasicChaiInfo2=Omit<ChaiNew2,"secretIngrediants">;

const chaiInfo2:BasicChaiInfo2={
  name:"Leamo Tea",
  price:30,
isHot:false,
// secretIngrediants:"dunno"
}
//"Object literal may only specify known properties, and 'secretIngrediants' does not exist in type 'BasicChaiInfo2'."