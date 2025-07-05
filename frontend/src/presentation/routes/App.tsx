import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetStartedPage from "../pages/user/get-started"
import AdminLogin from "../pages/admin/adminLogin"
import'../../App.css'
import HomePageMain from "../pages/user/MainUserPage"
import AddNewContactPage from "../pages/user/AddNewContactPage"
import Dummy from "../pages/user/dummyPage"





function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* user routes */}
      <Route path="/" element={<GetStartedPage/>}/>
      <Route path="/Home" element={<HomePageMain/>}/>
      <Route path="/AddNewContactpage" element={<AddNewContactPage/>}/>
      <Route path="/d" element={<Dummy/>}/>

 

      {/* admin routes */}
      <Route path="/admin/login" element={<AdminLogin/>}/>
          
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
