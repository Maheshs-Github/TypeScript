import { useState } from 'react'
import Card from './components/Card'
import type { Chai } from './types';
import List from './components/List';
import OrderForm from './components/OrderForm';
import ChildrenCard from './components/ChildrenCard';
import MyOpinion from './components/MyOpinion';

const list:Chai[]=[
  {id:1,name:"Mahesh",email:"mahesh@gmail.co m",price:100,isSpecial:true},
    {id:2,name:"Kunal",email:"kunal@gmail.co m",price:1000,isSpecial:true},
      {id:3,name:"Ram",email:"ram@gmail.co m",price:900,isSpecial:true},
        {id:1,name:"Aniket",email:"aniket@gmail.com",price:10000,isSpecial:true},
]


function App() {
const [count,setCount]=useState<number>(0);
  return (
    <>
    <Card name="Mahesh Mane" email="mahesh@gmail.com" isSpecial={true} price={100000}/>
    <Card name="Kunal Ji Shine" email="kunalkamra@gmail.com" isSpecial={true} price={100000} />
    <div>{count}</div>
    <button  onClick={()=>setCount(count+1)}>Click to Increae the Counter</button>
    <List items={list} />

    <OrderForm onSubmit={(order)=>console.log("Order Details: ",order.name,order.cups)}/>
      <ChildrenCard title='Discussion' children={<MyOpinion />} footer={<button>This is Footer Click it...</button>}/>
    </>
  )
}

export default App;
