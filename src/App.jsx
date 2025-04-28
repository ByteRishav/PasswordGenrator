



import { useState , useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length,setlength] = useState(8) 
  const [numberallowed,setnumberallowed]  = useState(false);
  const [characterallowed,setcharacterallowed] = useState(true)
  const [password , setpassword] = useState("")

  const passwordgenerator = useCallback(() =>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberallowed) str += "0123456789"
    if(characterallowed) str += "~!@#$%^&*()_"

    for(let i = 1 ; i <= length;i++){
      let char = Math.floor(Math.random()*str.length+1) 
      pass  += str.charAt(char);
      
    }
    console.log(pass)
    setpassword(pass)

  } , [length , numberallowed , characterallowed ])


 
  useEffect(() =>{ 
    passwordgenerator()
  },[length , numberallowed , characterallowed]) 

    const passwordRef = useRef(null);  
    const copypasswordtoclip =useCallback(() =>{
      passwordRef.current?.select() 
      passwordRef.current?.setSelectionRange(0,20) 
    window.navigator.clipboard.writeText(password)

    },[password])
    
  return (
    <>
 
<div id='div'>
  <h2 id='heading'>password generator</h2>
  <div >
    <input type='text'
    value={password}  
    onChange={(e)=>{
      setpassword(e.target.value)
    }}
    placeholder='password'
    
    ref={passwordRef}  
    style={{height:27,width:350,borderRadius:10 , backgroundColor:'black'}}/>
    
    <button id='copyb'
    onClick={copypasswordtoclip}  
    >
      copy
    </button>


    
    
  </div>


  <div>
    <div id='range'
    >
      <input
      
      type='range'
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setlength(e.target.value)}}
      
      ></input>
      <label style={{color:'black'}}><b>length</b> : {length}</label>
      
        <div/>

        <div >
    <input
      type='checkbox'
      // defaultChecked = {characterallowed}  if this is not comment that the chekbox will be ok already
      defaultChecked = {characterallowed}
      
      id='characterInput'
      style={{display:'inline',bottom:33}}
      onChange={() => {
        setcharacterallowed((prev) => !prev);
      }}
      
      />
        <label style={{color:'black'}}><b>character</b></label>
    </div>

    <div >
    <input
      type='checkbox'
      defaultChecked = {numberallowed}

      id='numberInput'
      style={{display:'inline',bottom:33}}
      onChange={() => {    
        // why onchange not onclick : becouse the onclick doesn't value to be change ,in some condtion button is clicked but value is not changes

        setnumberallowed((prev) => !prev);
      }}
      />
        <label style={{color:'black'}}><b>number</b></label>
    </div>


    
    

    
      
    

    
    
      
    
    
  </div>


 </div>
</div>  





</>
  )}

export default App
