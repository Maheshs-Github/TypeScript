function makeChai(type:string,cups:number){
  console.log(`Making ${cups} Cups of the ${type}`)
}

makeChai("Masala",2);
// is it used for suggestions for argumnet and there types ?

// just retrun type of the function
function makeChai2(type:string,cups:number):void{
  console.log(`Making ${cups} Cups of the ${type}`);
  // return 1; //error
}

// we can cehck if the values is given,more like guard we use it in the JS too 
function makeChai3(type:string,cups:number):string{
  console.log(`Making ${cups} Cups of the ${type}`);
  if(type) return type;
  return "no type Provided"
}

//optimal and defulat parameters
function orderChai(type?:string):void {
}
function orderChai2(type:string="Normal"):void {
}