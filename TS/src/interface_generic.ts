interface Chai{
  flavour:string,
  price:number
}


const masala:Chai={
  flavour:"Masala",
  price:30
}

// inteface do not genarting any exacutable code , in js all those are removed 

// do not understood this synatx , so DiscountCalculator methods return number that is what it is saying is it ?
interface DiscountCalculator{
  (price:number):number 
}

const apply50:DiscountCalculator=(p)=>p*0.5;


interface TeaMachine{
  start(price:number):void,
  stop():void,
}

const machine:TeaMachine={
  start(){
    console.log("start")
  },

  stop(){
    console.log("start")
  }
}

interface ChaiRatings{
  [flavour:string]:number
}

//  we saw 1 inteface can be decalred twic woth diff properties , and we can access it's both place values 
interface User {
  name:String
}

interface User{
  age:number
}

const u:User={
  name:"Mahesh Mane",
  age:23,
}


// same thing  as above 1 i g 
interface A{a:string}
interface B{b:string}


interface C extends A,B{}