import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCards from '../components/ProjectCards'
import { getAllProjectAPI } from '../services/allAPI'
import { Col,Row } from 'react-bootstrap'


function Projects() {
  const [searchKey,setSearchKey] = useState("")
  const [allprojects,setAllProjects] = useState([])
  console.log(allprojects);

  useEffect(()=>{
    getAllProgects()
  },[searchKey])

  const getAllProgects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
  
    }

    try{
      const result = await getAllProjectAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status == 200){
        setAllProjects(result.data)
      }

    }catch(err){
      console.log(err);
    }
    
  }
  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className='container-fluid'>
      <div className='d-flex justify-content-between mb-2'>
        <h2>All Projects</h2>
        <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search project By Language used'/>
       </div>

       <Row className='mt-3'>
        { allprojects?.length>0?
           allprojects?.map(project=>(
            <Col key={project} className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCards displayData={project}/>
            </Col>
           ))
         :
          <div className='fw-bolder text-danger m-5 text-center'>Project not found!!!</div>   
        }
      </Row>
     

    </div>
    </>
  )
}

export default Projects