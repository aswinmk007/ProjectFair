import React, { useContext, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import {Form,FloatingLabel} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../Contexts/TokenAuth';


function Auth({insideRegister}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [userInput,setUserInput] = useState({
    username:"",email:"",password:""
  })
  console.log(userInput);
  const handleRegister =async (e)=>{
    e.preventDefault()
    if(userInput.username && userInput.email && userInput.password){
      //api call
      try{
        const result = await registerAPI(userInput)
        console.log(result);
        if(result.status==200){
          toast.success(`Welcome ${result.data.username}...please Login to explore our website!!!`)
          setUserInput({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          }, 2000)
        }else{
          toast.error(result.response.data)
          setTimeout(()=>{
            setUserInput({username:"",email:"",password:""})

          }, 2000)
        }

      }catch(err){
        console.log(err);
      }

    }else{
      toast.warning("please fill the form completely")

    }

  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInput.email && userInput.password){
      //api call
      try{
        const result = await loginAPI(userInput)
        console.log(result);
        if(result.status==200){
          //store existingUser and token
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)


          toast.success(`Welcome ${result.data.existingUser.username}...`)
          setUserInput({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/')
          },2000)
         
        }else{
          toast.error(result.response.data)
         
        }



      }catch(err){
        console.log(err);
      }
    }else{
      toast.warning("please fill the form completely!!!")
    }

  }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <Link to={'/'} style={{textDecoration:'none'}} className='fw-bolder'><i className='fa-solid fa-arrow-left'></i>Back to Home</Link>
        <div style={{backgroundColor:'#08BDF7'}} className='card shadow p-5'>
          <div className='row'>
            <div className='col-lg-6'>
              <img className='w-100' src='https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png' alt="" />
            </div>
            <div className='col-lg-6 mt-5'>
              <h2 style={{color:'white'}} className='fw-bolder mt-2'>
              <i class="fa-solid fa-layer-group"></i>
               Project Fair
              </h2>
              <h5 style={{color:'white'}} className='fw-bolder mt-2'>
                Sign {insideRegister? 'up':'in'} to your Account 
              </h5>
              <Form>
                { insideRegister && 

                   <FloatingLabel
                   controlId="floatingInput"
                  label="Username"
                  className="mb-3"
               >
                   <Form.Control value={userInput.username} onChange={e=>setUserInput({...userInput,username:e.target.value})} type="text" placeholder="Username" />
                   </FloatingLabel>

                }
              <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control value={userInput.email} onChange={e=>setUserInput({...userInput,email:e.target.value})}  type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control value={userInput.password} onChange={e=>setUserInput({...userInput,password:e.target.value})} type="password" placeholder="Password" />
      </FloatingLabel>
      {
        insideRegister ?
           <div className='mt-3'>
            <button onClick={handleRegister} className='btn btn-primary'>Register</button>
            <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
           </div>
         :
          <div className='mt-3'>
            <button onClick={handleLogin} className='btn btn-primary'>Login</button>
            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>

          </div>
      }
              </Form>
            </div>

          </div>

        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>
  )
}

export default Auth