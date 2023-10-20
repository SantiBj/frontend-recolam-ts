import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ScheduleDay } from './CreateTrip/pages/ScheduleDay'


function App() {
  return (
    <HashRouter>
      <div>
        navbar
      </div>
      <Routes>
        <Route index element={<ScheduleDay />} />
      </Routes>
    </HashRouter>
  )
}

export default App
