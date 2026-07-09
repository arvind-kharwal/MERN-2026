import React, { useState } from 'react'

export default function Registration() {
const [name,setName] = useState();
const [email,setEmail] = useState();
const [password,setPassword] = useState();

async function sendData(){
  // alert(name+email+password)
  const serverres = await fetch('http://localhost:3003/register',{
    method: 'POST',
    body: JSON.stringify({name,email,password}),
    headers:{'Content-Type':'application/json'}
  });
  const res = await serverres.json();
  console.log(res);
  alert(res.msg);
}

return (
<div>   
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg" style={{ width: '600px' }}>
    <div className="card-body">
    <h2 className="card-title text-center mb-4">Register</h2>
    <form>
    <div className="form-group mb-3">
    <label>Name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" id="name" />
    </div>
    {name}
    <div className="form-group mb-3">
    <label>Email</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)}
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
    />
    </div>
    {email}
    <div className="form-group mb-3">
        <label>Password</label>
        <input 
                type="password" 
                onChange={(e)=>setPassword(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1" 
        />
    </div>

              <button type="submit" onClick={sendData} className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
        </div>
  )
}
