import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetStartedPage from "../presentation/pages/user/get-started"
import AdminLogin from "../presentation/pages/admin/adminLogin"
import'../App.css'
import HomePage from "../presentation/pages/user/HomePage"
import SignupModal from "../presentation/pages/user/signUp"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* user routes */}
      <Route path="/" element={<GetStartedPage/>}/>
      <Route path="/Home" element={<HomePage/>}/>
      {/* <Route path="/signUp" element={<SignupModal/>}/> */}

      {/* admin routes */}
      <Route path="/admin/login" element={<AdminLogin/>}/>
          
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
