import { HashRouter, Route, Routes } from 'react-router-dom'
import { ScheduleDay } from './CreateTrip/pages/ScheduleDay'
import { CreateTrip } from './CreateTrip/context/CreateTrip'
import { Customer } from './CreateTrip/pages/Customer'


function App() {
  return (
    <CreateTrip>
      <HashRouter>
        <div>
          navbar
        </div>
        <Routes>
          <Route index element={<ScheduleDay />} />
          <Route path="/create-trip/customer" element={<Customer />} />
        </Routes>
      </HashRouter>
    </CreateTrip>

  )
}

export default App
