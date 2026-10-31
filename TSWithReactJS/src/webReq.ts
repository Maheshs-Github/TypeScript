import axios, { type AxiosResponse } from "axios";
import { useEffect } from "react";


interface Todo{
  id:number,
  todo:string,
  userId:number,
  completed:boolean,

}
// axios.get("https://dummyjson.com/todos")
// // .then(res=> res.todos.forEach((data)=>console.log("data: ",data)))
// .then(res=> res.data.todos.forEach(element =>  console.log("element: ",element)
// ));

// useEffect(()=>fetchData,[]);

// const fetchData=async()=>{
//   try {
//     const res:AxiosResponse<Todo[]>=await axios.get("https://dummyjson.com/todos");
// console.log("res: ",res)
//   } catch (error:any) {
//     // console.log("error: ",error?.message)
//     if(axios.isAxiosError(error)){
//       console.log("Axios Error: ",error.message);
//       if(error.response)
//         console.log(error.response.status);
//     }
    
//   }
// }


// 
// 
// with the fetch 
const fetchData=async () => {
  try {
    const res=await fetch("https://dummyjson.com/todos");
    if(!res.ok)
      throw new Error(`HTTP ERROR : ${res.status}`);
    const data:Todo=await res.json();
    console.log("Data: ",data)
  } catch (error:any) {
    if(axios.isAxiosError(error)){
      console.log("Axios Error: ",error?.message);
      if(error.response){
        console.log(error?.response.status)
      }
    }
    
    
  }
  
}