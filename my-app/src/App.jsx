import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='app'>
      <section className='side-bar'>
        <button>+ New Chat</button>
        <ul className='history'>
          <li>BLUGH</li>
        </ul>
        <nav>
          <p>Made by group</p>
        </nav>
      </section>
      <section className='main'>
        <h1>Interview GPT</h1>
        <ul className='feed'>

        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input type="text" />
            <div id='submit'>send</div>
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
