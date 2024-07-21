import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';

function App() {

  const [length, setLength]=useState(8);
  const [no, setNo]=useState(false);
  const [char, setChar]=useState(false);
  const [password, setPassword]=useState("");

  const passwordRef=useRef();

useEffect(()=>passwordGenerator(), [length, no, char, setPassword]);


const cpyClick=useCallback(()=>{

  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,20);
  window.navigator.clipboard.writeText(passwordRef.current.value);

}, [password]);


  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(no){
      str+="0123456789"
    }
    if(char){
      str+="!@#$%^&*(_){+-}[=]?<>~`"

    }
    for (let i = 1; i<=length; i++){
         let charnew=Math.floor(Math.random()*str.length+1);
         pass+=str.charAt(charnew);     
    }
    setPassword(pass);
   

  }
    , [length, no, char, password]);


  return (
    <>
      <h1 className="text-6xl text-center text-white font-mono font-semibold">Password Generator</h1>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-xl px-6 py-8 my-8 text-orange-500 bg-gray-700'>
        <div>
        <input type='text'
         value={password} 
         ref={passwordRef}
         readOnly 
         id='pass'
         placeholder='Password'
         className='text-gray-500 text-xl font-semibold border-none px-4 py-2  cursor-pointer rounded-lg'
         ></input>
         <button onClick={cpyClick} className='font-semibold bg-blue-400 rounded-lg text-xl px-4 py-2 ml-5 text-white'>Copy</button>
        </div>
        
         <div className='mt-6 flex items-center gap-x-5'>
         <input type='range'
         min={6}
         max={20}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>{setLength(e.target.value)}}
         ></input>
         <label className='ml-2 text-xl font-semibold'>Length: {length}</label>
         
         <div className='felx items-center gap-x-5'>
          <input type='checkbox'
          defaultChecked={no}
          id='NoInput'
          className='w-4 h-4 cursor-pointer'
          onChange={()=>{
            console.log(no);
            setNo(prev=> !prev)
          }}
          ></input>
          <label className='ml-2 text-xl font-semibold'>Numbers</label>
          <input type='checkbox'
          defaultChecked={char}
          id='CharInput'
          className='ml-4 w-4 h-4 cursor-pointer'
          onChange={()=>{
            setChar(prev=> !prev)
          }}
          ></input>
          <label className='ml-2 text-xl font-semibold'>Characters</label>
         </div>
         </div>
         
      </div>
     
    </>
  )
}

export default App
