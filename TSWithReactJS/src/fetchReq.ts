interface Todo{
  userId:number,
  is:number,
  title:string,
  completed:boolean,
}


const fetchData=async()=>{
  try {
    const res=await fetch("https://dummyjson.com/todos");
    if(!res.ok)
      throw new Error(`HTTP error: ${res.status}`);

    const data:Todo=await res.json();
    console.log("data: "+data);
    
  } catch (error) {
    
  }

}