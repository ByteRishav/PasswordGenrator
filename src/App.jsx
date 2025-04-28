
// useCallback : how it is memoizing : 
// if any state will change as a dependency than our function will recreat
// not at every time , if the dependecies are same than function will not recreated



import { useState , useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length,setlength] = useState(8)  // use state is used to check weather "hua ki nahi"
  const [numberallowed,setnumberallowed]  = useState(false);
  const [characterallowed,setcharacterallowed] = useState(true)
  const [password , setpassword] = useState("")

// the passowordgenerator function can be made simply with out the hook callback
  // usecallback is memoizing hook which means we are storing the defined function once and than using that on time with re-declaration.
                         //  hook , fucntion , dependencies where to use the same fucntion
  const passwordgenerator = useCallback(() =>{ // usecallback hook is used when all dependencies can call at there time
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberallowed) str += "0123456789"
    if(characterallowed) str += "~!@#$%^&*()_"

    for(let i = 1 ; i <= length;i++){
      let char = Math.floor(Math.random()*str.length+1) // +1 is to avoid the 0
      pass  += str.charAt(char);
      
    }
    console.log(pass)
    setpassword(pass)

  } , [length , numberallowed , characterallowed ])


  // now we need the another service through that our passwordgenerator function can be call beacause it is not can be called
  // inside the own passwordgenerator having useCallback hook and password  can't be appear on the box
  // so this hook is useEffect() : we will call the passwordGenerator inside the another hook

  useEffect(() =>{  //    useeffect(function,dependencies) // dependecies mean when ther is movement with dependencies the function will run
    passwordgenerator()
  },[length , numberallowed , characterallowed]) // here the dependecies array is used to run the paswordgen lot of time 
    // but in callback hook the array of dependencies iare use to optimise

    const passwordRef = useRef(null);  // null it means that we don't have or wants to give the default refrence to it.
// now in input we create the reference
    const copypasswordtoclip =useCallback(() =>{
      passwordRef.current?.select()  // use to show whether the copied or not
      passwordRef.current?.setSelectionRange(0,20) // use the select the fixed range
    window.navigator.clipboard.writeText(password)

    },[password])
    
  return (
    <>
 
<div id='div'>
  <h2 id='heading'>password generator</h2>
  <div >
    <input type='text'
    value={password}    // alow the password showing programatical or according to function designed 
    onChange={(e)=>{
      setpassword(e.target.value)
    }}
    placeholder='password'
    // readOnly        // we will have to remove this if want's to write something
    ref={passwordRef}   // this will be the variable that we have created in use ref hook
    // now through this refrence we can make the optimization in selecting the password like select
    // only 4 digits of password 
    style={{height:27,width:350,borderRadius:10 , backgroundColor:'black'}}/>
    
    <button id='copyb'
    onClick={copypasswordtoclip}   // this is the function which will call on click and this function is defined above
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
