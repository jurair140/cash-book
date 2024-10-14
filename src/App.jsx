import { useState } from 'react'
import './bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashborad from './pages/Dashborad'




function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dash" element={<Dashborad />} />
        </Routes>
    </>
  )
}

export default App
