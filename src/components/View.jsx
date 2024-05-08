import React, { useEffect, useState,useContext } from 'react'
import Edit from '../components/Edit'
import Add from '../components/Add'
import { geUserProjectAPI,removeProjectAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../Contexts/ContextAPI'



function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)

  const {addResponse,setAddResponse} = useContext(addResponseContext)

  const [userProjects,setUserProjects] = useState([])
  console.log(userProjects);

  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
  
    }
    try{
     const result = await geUserProjectAPI(reqHeader)
     console.log(result);
     if(result.status == 200){
      setUserProjects(result.data)
     }

    }catch(err){
      console.log(err);
    }

  }

  const handleDeleteProject =async (projectId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type" :"application/json",
        "Authorization" : `Bearer ${token}`
      }
      //api call
      const result = await removeProjectAPI(projectId,reqHeader)
      if(result.status == 200){
        getUserProjects()
      }else{
        console.log(result);
      }
    }

  }
  return (
    <div>
      <div className='d-flex justify-content-between w-100'>
        <h2 className='text-primary'>All Projects</h2>
        <button className='btn'><Add/></button>

      </div>
      <div className='mt-4'>
        { userProjects?.length>0 ?
          userProjects?.map(project=>(
            <div className='d-flex justify-content-between border p-2 rounded mb-3'>
            <h3>{project?.title}</h3>
            <div className='icons d-flex'>
              <div className='btn'><Edit project={project}/></div>
              <div className='btn mt-2'><a href={project?.github} target='_blank'><i style={{color:'black'}} className='fa-brands fa-github'></i></a></div>
              <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
  
            </div>
          </div>
           ))
        :
        <div className='fw-bolder text-warning'>No Projects Uploaded Yet</div>   

        }
      </div>
    </div>
  )
}

export default View