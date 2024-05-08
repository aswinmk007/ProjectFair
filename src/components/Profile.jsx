import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import profileimg from '../assets/profile.jpg'
import { json } from 'react-router-dom'
import { SERVER_URL } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from "../services/updateUserAPI"


function Profile() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profileImage){
      setPreview(URL.createObjectURL(userDetails.profileImage))
    }else{
      setPreview("")
    }
  },[userDetails.profileImage])

  const handleUserProfile =async ()=>{
    const {username,email,password,github,linkedin,profileImage} = userDetails
    if(!github || !linkedin){
      toast.warning("please fill the form completely!!!")

    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : preview?"multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }else{
            console.log(result);
          }

        }catch(err){
          console.log(err);
        }
      


    }
     

  }
}


  return (
    <>
    <div className='d-flex justify-content-between'>
      <h3 className='text-primary'>User Profile</h3>
      <button  onClick={() => setOpen(!open)} className='btn'><i className='fa-solid fa-chevron-down'></i></button>
    </div>

    <Collapse in={open}>
        <div className='row justify-content-center align-items-center shadow rounded p-3' id="example-collapse-text">
        <label className='text-center mb-3'>
            <input onChange={e=>setUserDetails({...userDetails,profileImage:e.target.files[0]})} type="file" style={{display:'none'}} />
            
              {
                existingImg == "" ?
                <img width={'180px'} className='rounded-circle' src={preview?preview:profileimg} alt="" />
                :
                <img width={'180px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />

                }
             

              
        
        </label>
        <div className='mb-2'>
          <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" className='form-control' placeholder='Github URL' />
          </div>
          <div className='mb-2'>
          <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" className='form-control' placeholder='LinkedIn URL' />
          </div>
          <div className='d-grid'>
            <button onClick={handleUserProfile} className='btn btn-warning'>Upload Profile</button>
          </div>
        </div>
      </Collapse>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Profile