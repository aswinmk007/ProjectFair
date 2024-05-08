import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'

function Dashboard() {
  const [displayName,setdisplayName] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const {username} = JSON.parse(sessionStorage.getItem("existingUser"))
      setdisplayName(username)
    }else{
      setdisplayName("")
    }
  })
  return (
    <>
    <Header insideDashBoard={true}/>
    <div style={{marginTop:'100px'}} className='container-fluid'>
      <div className='row mt-5'>
        <div className="col-lg-8">
        <h1>Welcome <span className='text-primary'>{displayName}</span>,</h1>

          <View/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard