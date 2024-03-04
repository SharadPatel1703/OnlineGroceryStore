import React, {useState} from 'react'
import {json, Navigate, useNavigate} from "react-router-dom";

function ExistingUser() {
    const [email, setEmail] = useState('')
    const [password,setPassword]= useState('')
    const Navigate = useNavigate()

    let handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    let handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/check-password", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await response.json

            if (response.ok){
                console.log("Access granted", data.message)
                Navigate('/Display')
            }
            else {
               console.log('Access denied: ', data.message)
            }
        }
        catch (error){
            console.error("Error while authenticating: ", error)
        }
    }


    return (
        <>
        <div>ExistingUser</div>
            <div className={"container"}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email"
                               aria-describedby="emailHelp" onChange={handleEmail}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={handlePassword}/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>

        </>
    )
}

export default ExistingUser
