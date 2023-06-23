import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState(null)
  const [previoschats, setPreviosChat] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = ()=>{
    setResult(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (el)=>{
    setCurrentTitle(el)
    setResult(null)
    setValue("")
  }

  const getMessages = async ()=>{
    try {
      const response = await fetch(`http://localhost:7200/completions`, {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers:{
          "Content-Type": "application/json"
        }
      })
      const data = await response.json();
      // console.log(data.choices[0].message.content);
      setResult(data.choices[0].message)
      // setValue("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    // console.log(currentTitle, value, result)
    if(!currentTitle && value && result){
      setCurrentTitle(value)
    }
    if(currentTitle && value && result){
      setPreviosChat(prevchats=>(
        [...prevchats, {
          title: currentTitle,
          role: "user",
          content: value
        },{
          title: currentTitle,
          role: result.role,
          content: result.content
        }]
      ))
    }
  }, [result, currentTitle])

  // console.log(previoschats)

  const currentChat = previoschats.filter(el=>el.title==currentTitle)
  const uniqueTitles = Array.from(new Set(previoschats.map(el=>el.title)))
  // console.log(uniqueTitles)

  return (
    <div className='app'>
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {
            uniqueTitles?.map((el,idx)=><li key={idx} onClick={()=>handleClick(el)}>{el}</li>)
          }
        </ul>
        <nav>
          <p>Made by group</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>Interview GPT</h1>}
        <ul className='feed'>
          {currentChat?.map((el, idx)=><li key={idx}>
            <p className='role'>{el.role}</p>
            <p>{el.content}</p>
          </li>)}
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <textarea type="text" value={value}  onChange={(e)=>{
              setValue(e.target.value)
            }} />
            <button id='submit' onClick={getMessages}>send</button>
          </div>
          <p className='info'>
            ChatGPT is a language model developed by OpenAI. It is based on the GPT (Generative Pre-trained Transformer) architecture, specifically GPT-3.5. It is designed to generate human-like text responses given a prompt or a conversation.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
