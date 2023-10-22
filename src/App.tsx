import { HashRouter, Route, Routes } from 'react-router-dom'
import { ScheduleDay } from './CreateTrip/pages/ScheduleDay'
import { CreateTrip } from './CreateTrip/context/CreateTrip'


function App() {
  return (
    <CreateTrip>
      <HashRouter>
        <div>
          navbar
        </div>
        <Routes>
          <Route index element={<ScheduleDay />} />
        </Routes>
      </HashRouter>
    </CreateTrip>

  )
}

export default App
