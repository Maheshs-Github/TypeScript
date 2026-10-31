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

// Type Narrowing 
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