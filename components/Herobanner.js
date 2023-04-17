import React , { useState }  from 'react'
import { Router, useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import { Cursor,useTypewriter } from 'react-simple-typewriter';


function Herobanner() {

    const [text , count] =useTypewriter({
        words:[
            "Option chain",
            "Open intrest",
            "Price and VIXI",
        ],
        loop:true,
        delaySpeed:2000,
    });
 const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle sign in logic
    
        Router.href="/onecliq"
      
    };

 
  return (
    <div >
 
     
    


      {/* sign in and sign up page */}

<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-gray-900"> Decode the Market with 
        <span className='mr-3'>{text}</span>
        <Cursor cursorColor="white"/></h1>
      {/* <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p> */}
    </div>

    
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0  ">
      
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign IN</h2>
        <form className="relative mb-4">
        <label  className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
         focus:ring-indigo-200 text-base outline-none
         text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>

<label  className="leading-7 text-sm text-gray-600">Enter your password</label>
        <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </form>


      <button onClick={handleSubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">Sign IN</button>
      <p className="text-xs text-gray-500 mt-3">If don't have account <a href='/createaccount ' className='text-green-500 font-serif text-xl'>Sign up</a> .</p>
    </div>
  </div>
</section>
     

     

    </div>
  )
}

export default Herobanner
