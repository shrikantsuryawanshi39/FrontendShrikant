import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
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
      <Route path="/pages/auth/Login" element={<Login />} />
      <Route path="/pages/auth/Signup" element={<Signup />} />
      <Route path="/components/About" element={<About />} />
      <Route path="/components/Contact" element={<Contact />} />
      <Route path="/pages/admin/Administration" element={<Administration />} />
      <Route path="/pages/admin/AddUser" element={<AddUser />} />
      <Route path="/pages/admin/AddCluster" element={<AddCluster />} />
      <Route path="/pages/user/UserList" element={<UserList />} />
      <Route path="/pages/cluster/ClusterList" element={<ClusterList />} />
    </Routes>
      <Footer />
  </BrowserRouter>
    </div>
  )
}

export default App
