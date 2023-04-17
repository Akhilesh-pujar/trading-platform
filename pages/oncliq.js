
import React,{useState} from 'react'
import {AiOutlineCloseCircle , AiOutlineDown} from "react-icons/ai"
import {BsFillPlayFill} from "react-icons/bs"



const options = ['','finvsia ', 'Broker 2', 'Broker 3'];
function oncliq() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected option: ${selectedOption}`);
  };
  const handltradewindow =()=>{
    alert("please sign in")
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="select" className="block text-gray-700 font-sans mb-2">
          Select Broker
        </label>
        <div className="relative">
          <select
            id="select"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <AiOutlineDown/>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
       Refresh
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
         Add broker 
        </button>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          
          href="/tradewindow"
        >
        <span> trade window</span>
        </button>
        
      </div>
    </form>
   {/* ---------------------------table----------------------- */}

   <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Secret key</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Last Generated token at</th>
              <th scope="col" className="px-6 py-4">Generate token</th>
              <th scope="col" className="px-6 py-4">Action</th>
              <th scope="col" className="px-6 py-4">Added at</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-gray-300  ">
              <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td className="whitespace-nowrap px-6 py-4">Mark</td>
              <td className="whitespace-nowrap px-6 py-4">Otto</td>
              <td className="whitespace-nowrap px-6 py-4 cursor-pointer text-red-500 font-bold">Click to genarate token</td>
              <td className="whitespace-nowrap px-6 py-4 inline-flex"><BsFillPlayFill className="text-green-500 text-2xl cursor-pointer"/>
               <AiOutlineCloseCircle className="text-red-500 text-2xl cursor-pointer"/></td>
               <td className="whitespace-nowrap px-6 py-4">Otto</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default oncliq
