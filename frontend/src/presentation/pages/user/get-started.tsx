import React, { useState } from 'react'
import '../../../styles/user/get-started.css';
import GetStartedPageModal from "./GetStartPageModal"

function GetStartedPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div >
    <div className='GetStartedPageImageDiv'>
      <img style={{width:"303px",height:"303px",marginLeft:"56px",borderRadius:"150px"}} src="\src\assets\images\file-MNLWh3Knn3VmdNXgBsDF41.webp" alt="logo image" />
    </div>
    <div>
      <h2 style={{marginLeft: "119px"}}>Welcome to Talko</h2>
      <p>A Simple, Reliable, Privet Way To Use Talko On Your Computer</p>
    </div>
    <div style={{padding:"20px"}}>
      <button onClick={()=>setShowModal(true)} style={{marginLeft:"127px"}}>Get Started</button>
      {showModal && <GetStartedPageModal onClose={() => setShowModal(false)} />}
    </div>
    </div>
    </>
  )
}
export default GetStartedPage