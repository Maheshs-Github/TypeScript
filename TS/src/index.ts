function greet(person:string):string{
  return `Hello ${person}`
}

const name:string="Mahesh";
console.log(greet(name));


// union and any 
let userName:string|number="Mahesh";
userName=123;

let status:"pending" | "completed" | "error"="pending";
status="completed";
status="dunno"; //error

const orders=['1','2','3','4','5'];

let currentorder:string | undefined;
for(let order of orders){
  if(order==='2'){
    currentorder=order;
    break;
  }
    
}

// Type Narrowing && Type Guards 
function getChai(kind:string | number){
  if(typeof kind==='string')
    return `Your Order for the ${kind} is been Sent`;
  return `Your Order Total is: ${kind}`
}

console.log(currentorder);

function serverChai(msg?:string){
  if(msg)
    return `Serving ${msg}`;
  return `Serving the Default Chai`;
}


function orderChai(size:"small" | "medium" | "large" | number){
  if(typeof size!=='number')
    return `${size} Cutting Chai`;
  return `Chai Order is: ${size}`
}


class KulhadChai{
  serve(){
    return `Serving Khulhad Chai`;
  }
}

class CuttingChai{
  serve(){
    return `Serving Cutting Chai`;
  }
}

function serve(chai:KulhadChai | CuttingChai){
  if(chai instanceof KulhadChai)
    return chai.serve();
}


type ChaiOrder={
  type:String
  sugar:number
}

function isChaiOrder(obj:any):obj is ChaiOrder{
  return(
    typeof obj==="object" && 
    obj!=null && 
    typeof obj.type==="string" && 
    typeof obj.sugar === "number"
  )
}

function serveOrder(item:ChaiOrder | string){
  if(isChaiOrder(item)){
    return `Serving ${item.type} chai with ${item.sugar} sugar`
  }
  return `Serving custom chai: ${item}`;
}


type MasalaChai={type:"masala",spicelevel:number}
type GingerChai={type:"ginger",gingeramount:number}
type MilkChai={type:"milk",milkamount:number}


type Chai=MasalaChai | GingerChai | MilkChai;

function MakeChai(order:Chai)
{
  switch(order.type){
    case "masala":
      return `Masala Chai`;
        case "ginger":
      return `ginger Chai`;
          case "milk":
      return `milk Chai`;
      default:
        return `Normal Chai`;
  }
}

function brew(order:MasalaChai | GingerChai){
  if("gingerLevl" in order)
    // 
}

function isStringArray(arr:unknown):arr is string[]{

}