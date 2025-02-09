import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button } from 'react-bootstrap'
import upload from '../assets/upload.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../Contexts/ContextAPI';



function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [preview,setPreview] = useState("")
  const [imgFilestatus,setimgFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImage:""
  })
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({title:"",language:"",overview:"",github:"",website:"",projectImage:""})
  }
  const handleShow = () => setShow(true);
  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage.type == "image/png" || projectDetails.projectImage.type == "image/jpg" || projectDetails.projectImage.type == "image/jpeg" ){
      setimgFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setPreview(upload)
      setimgFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
     
  },[projectDetails.projectImage])

  const handleUploadProject =async ()=>{
    const {title,language,overview,github,website,projectImage} = projectDetails
    if(!title || !language || !overview || !github || !website || !projectImage){
      toast.warning("please fill the form completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
          //api call

        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            setAddResponse(result)
            handleClose()
          }else{
            toast.warning(result.response.data)
          }
          
        }catch(err){
          console.log(err);
        }
      }
       
       
     

    }
  }
  return (
    <>
    <button className='btn' onClick={handleShow}><i className='fa-solid fa-plus me-1'></i>Add New</button>

    <Modal
         size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
          <div className="col-lg-4">
            <label>
              <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
              <img height={'200px'} className='img-fluid mt-5' src={preview} alt="" />
            </label>
            {!imgFilestatus&&<div className='text-danger my-2'>*Upload only following file types (png, jpg, jpeg)</div>}
          </div>
          <div className="col-lg-8">
            <div className='mb-2'>
              <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </div>
            <div className='mb-2'>
              <input type="text" className='form-control' placeholder='Languages used in the project' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
              </div>
            <div className='mb-2'>
              <input type="text" className='form-control' placeholder='Project GITHUB Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
              </div>
            <div className='mb-2'>
              <input type="text" className='form-control' placeholder='Project WEBSITE Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
              </div>
            <div className='mb-2'>
              <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
              </div>




          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadProject} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Add