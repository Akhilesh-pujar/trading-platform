import React from 'react'


export async function getServerSideProps(){
    const res = await fetch ("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    console.log(data);
    return {
        props:{
            todos:data
        }
       
    }
    
}

export default function tradewindow({todos}) {
  return (
    <div>
    <h1>Trading window</h1>
   
     {todos.map((todo)=>{
        <div>
            <p>{todo.id} : {todo.title}</p>
        </div>
     })}
    
    </div>
  )
}


