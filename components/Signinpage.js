import React,{useState} from 'react'

function Signinpage() {
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
    };
  return (
    <div className=' fixed right-5'>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <h2 className="text-3xl font-sans mb-8 text-yellow-500">Sign In</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-sans mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-sans mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-white mt-8">
          Don't have an account?{' '}
          <a href="/createaccount" className="text-indigo-500 font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Signinpage
