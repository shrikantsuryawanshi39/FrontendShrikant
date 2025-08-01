import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import About from './components/About';
import Contact from './components/Contact';
import Administration from './pages/admin/Administration';
import AddCluster from './pages/admin/AddCluster';
import AddUser from './pages/admin/AddUser';
import UserList from './pages/user/UserList';
import ClusterList from './pages/cluster/ClusterList';

function App() {

  return (
    <div className='main max-h-100vh overflow-hidden bg-[rgba(0,0,0,0.363)] text-white'>
      <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Administration" element={<Administration />} />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/AddCluster" element={<AddCluster />} />
      <Route path="/UserList" element={<UserList />} />
      <Route path="/ClusterList" element={<ClusterList />} />
    </Routes>
      <Footer />
  </BrowserRouter>
    </div>
  )
}

export default App
