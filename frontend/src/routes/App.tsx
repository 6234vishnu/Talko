import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetStartedPage from "../presentation/pages/user/get-started"
import AdminLogin from "../presentation/pages/admin/adminLogin"
import'../App.css'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* user routes */}
      <Route path="/" element={<GetStartedPage/>}/>

      {/* admin routes */}
      <Route path="/admin/login" element={<AdminLogin/>}/>
          
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
