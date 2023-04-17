import React from 'react'
import { signIn,signOut,useSession } from 'next-auth/react'
import Link from 'next/link'
import Router from 'next/router'

import{AiFillGithub , AiFillGoogleCircle} from "react-icons/ai"
import{BiLogOut} from "react-icons/bi"
import{MdAccountCircle} from "react-icons/md"

function Nabar() {
  const { data: session } = useSession()
  
async function handlegoogle(){
    signIn('google' , {callbackUrl:"http://localhost:3000/oncliq"})
  }
  async function handlegithub(){
    signIn('git' , {callbackUrl:"http://localhost:3000/oncliq"})
  }
  if(session) {
    return <div className='flex justify-evenly text-center '>
   
      <p className=' text-serif text-center flex justify-center cursor-pointer'><MdAccountCircle className='flex text-2xl'/>Welcome to trading app ,Signed in as  {session.user.email}  </p>
      <button onClick={() => signOut()} className='flex hover:text-red-400 '><BiLogOut className='text-2xl'/>LOG OUT</button>

      
    </div>
  }
  if(signIn){
   

 }

 
  return (
    <div className='bg-gradient-to-r from-indigo-500 ...'>
      <header className="text-black body-font shadow-md">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">

      <span className="ml-3 text-xl">OI PULSE</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a href='/' className="mr-5 hover:text-red-900">Home</a>
      <a className="mr-5 hover:text-red-900 cursor-pointer">Second Link</a>
      <a className="mr-5 hover:text-red-900 cursor-pointer">Third Link</a>
      <a className="mr-5 hover:text-red-900 cursor-pointer">Fourth Link</a>
    </nav>
    <br/>
    <div className='md:ml-auto flex flex-wrap items-center text-base justify-center divide-x-2 space-x-3'>
    <a  className=' font-serif  hover:text-green-500 underline cursor-pointer' onClick={handlegithub}><AiFillGithub className='text-2xl'/></a>
           <a  className=' font-serif  hover:text-green-500 underline cursor-pointer' onClick={handlegoogle}><AiFillGoogleCircle className='text-2xl'/></a>

   <Link href="/createaccount"><button className=' font-serif  hover:text-green-500   hover:underline '>Sign UP</button></Link> 
   <Link href="/oncliq" ><button className='font-serif hov
   '>ONECLICK</button></Link>
    </div>
   
    
  </div>
</header>
    </div>
  )
}

export default Nabar
