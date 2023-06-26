import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [flag, setFlag] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerMsg, setRegisterMsg] = useState("")
    const [loginFail, setLoginFail] = useState(false)
    const [loginMsg, setLoginMsg] = useState("")
    const navigate = useNavigate();

    function handleSignup(e) {
        fetch(`https://lazy-erin-jackrabbit.cyclic.app/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.msg==="Registration Succesfull"){
                    setRegisterSuccess(true)
                    setTimeout(()=>{
                        setRegisterSuccess(false)
                    }, 5000)
                }
                setEmail(""); setPassword(""); setName("")
            })
            .catch((error) => console.log(error))
    }

    function handleLogin(e) {
        fetch(`https://lazy-erin-jackrabbit.cyclic.app/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.msg==="login success"){
                    localStorage.setItem("token", JSON.stringify(data.token))
                    navigate("/main")
                } 
                else{
                    setLoginMsg(data.msg)
                    setLoginFail(true);
                    setTimeout(()=>{
                        setLoginFail(false);
                    }, 5000)
                } 
                setEmail(""); setPassword("")
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className='loginContainer'>

            {registerSuccess && <div className="successPopup">
                <p><span className="tick">&#10004;</span> Registration Success</p>
            </div>}

            {loginFail && <div className='loginFailPopup'>
                <p><span className="cross">&#10060;</span> {loginMsg}</p>    
            </div>}

            

            <div className="formContainer">

                {flag ?
                    (<form id='registerForm' onSubmit={(e) => {
                        e.preventDefault()
                        handleSignup()
                    }}>
                        <h3 className='heading'>Registration Form</h3>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}  />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="Signup" id='credentialSubmit'/>
                    </form>) :
                    (<form id='loginForm' onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>
                        <h3 className='heading'>Login Form</h3>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="Login" id='credentialSubmit' />
                    </form>)
                }
            </div>

            <pre>                Already have an Account?<button id='formBtn' onClick={(e) =>{setRegisterSuccess(false); setFlag(!flag)}}>{flag ? "Login" : "Signin"}</button></pre>
        </div>
    )
}

export default Login;