import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


function Main() {
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const [result, setResult] = useState(null)
    const [previoschats, setPreviosChat] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)
    // const [course, setCourse] = useState("")  
    // const [subject, setSubject] = useState("")  
    // const messageContainerRef = useRef(null);

    const createNewChat = () => {
        setResult(null)
        setValue("")
        setCurrentTitle(null)
    }

    const handleClick = (el) => {
        setCurrentTitle(el)
        setResult(null)
        setValue("")
    }

    const handleLogoutBtn = async ()=>{
        // let token = JSON.parse(localStorage.getItem("token"))
        // document.cookie = `token=${token}`
        // try {
        //     const response = await fetch(`https://localhost:7200/users/logout`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": token
        //         }
        //     })
        //     const data = await response.json();
        //     if(data.msg==="Logout SuccesFully") {
        //         navigate("./")
        //     }
        //     console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const getMessages = async () => {
        try {
            const response = await fetch(`https://lazy-erin-jackrabbit.cyclic.app/completions`, {
                method: "POST",
                body: JSON.stringify({
                    message: value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            // console.log(data.choices[0].message.content);
            setResult(data.choices[0].message)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleCourseSubmit = ()=>{
    //   getMessages();
    // }


    useEffect(() => {
        // console.log(currentTitle, value, result)
        if (!currentTitle && value && result) {
            setCurrentTitle(value)
        }
        if (currentTitle && value && result) {
            setPreviosChat(prevchats => (
                [...prevchats, {
                    title: currentTitle,
                    role: "user",
                    content: value
                }, {
                    title: currentTitle,
                    role: result.role,
                    content: result.content
                }]
            ))
        }
    }, [result, currentTitle])


    const currentChat = previoschats.filter(el => el.title == currentTitle)
    const uniqueTitles = Array.from(new Set(previoschats.map(el => el.title)))

    return (
        <div className='app'>
            <section className='side-bar'>
                <button onClick={createNewChat}>+ New Chat</button>
                <ul className='history'>
                    {
                        uniqueTitles?.map((el, idx) => <li key={idx} onClick={() => handleClick(el)}>{el}</li>)
                    }
                </ul>
                <nav>
                    <button id='logoutBtn' onClick={handleLogoutBtn}>Logout</button>
                </nav>
            </section>

            <section className='main'>
                {!currentTitle && <h1>Interview GPT</h1>}
                <ul className='feed' >
                    {currentChat?.map((el, idx) => <li key={idx}>
                        <p className='role'>{el.role}</p>
                        <p>{el.content}</p>
                    </li>)
                    }
                </ul>


                <div className='bottom-section'>
                    <div className='input-container'>
                        <textarea type="text" id='promptbox' value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }} />
                        <button id='submit' onClick={() => { getMessages() }}>send</button>
                    </div>
                    <p className='info'>
                        ChatGPT is a language model developed by OpenAI. It is based on the GPT (Generative Pre-trained Transformer) architecture, specifically GPT-3.5. It is designed to generate human-like text responses given a prompt or a conversation.
                    </p>
                </div>
            </section>


        </div>
    )
}

export default Main