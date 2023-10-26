import { HashRouter, Route, Routes } from "react-router-dom";
import { ScheduleDay } from "./CreateTrip/pages/ScheduleDay";
import { CreateTrip } from "./CreateTrip/context/CreateTrip";
import { Customer } from "./CreateTrip/pages/Customer";
import { Truck } from "./CreateTrip/pages/Truck";
import { Confirmation } from "./CreateTrip/pages/Confirmation";
import { NavBar } from "./components/NavBar";
import { Home } from "./sections/Home/Home";
import { Footer } from "./components/Footer";
import { TripsActives } from "./sections/ActivesTrips/pages/TripsActives";
import { DetailsTripActive } from "./sections/ActivesTrips/pages/DetailsTripActive";

function App() {
  return (
    <CreateTrip>
      <HashRouter>
        <main className="bg-[url('https://acortar.link/lpmbDO')] bg-no-repeat  bg-center bg-cover">
          <NavBar />
          <div>navbar</div>
          <section className="mb-[100px] w-[85%] max-w-[1300px] mx-auto flex flex-col justify-center min-h-[100vh]">
            <Routes>
              <Route path="" element={<Home />} />
              <Route
                path="/create-trip/scheduleDay"
                element={<ScheduleDay />}
              />
              <Route path="/create-trip/customer" element={<Customer />} />
              <Route path="/create-trip/truck" element={<Truck />} />
              <Route
                path="/create-trip/confirmation"
                element={<Confirmation />}
              />
              <Route path="/trip-actives" element={<TripsActives />} />
              <Route
                path="/trip-active-details/:trip"
                element={<DetailsTripActive />}
              />
            </Routes>
          </section>
          <Footer />
        </main>
      </HashRouter>
    </CreateTrip>
  );
}

export default App;
