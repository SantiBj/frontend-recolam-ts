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
import { ListTripsWithoutTruck } from "./sections/assignTruck/pages/ListTripsWithoutTruck";
import { TruckAvailable } from "./sections/assignTruck/pages/TruckAvailable";
import { DetailsTrip } from "./sections/startTripC/pages/DetailsTrip";
import { TripsWithoutStart } from "./sections/startTripC/pages/TripsWithoutStartC";
import { CreateUser } from "./sections/CreateUser/pages/CreateUser";
import { NotFound } from "./sections/NotFound";
import { DataUser } from "./sections/CreateUser/pages/DataUser";
import { Trucks } from "./sections/StateTrucks/pages/Trucks";
import { ListTrips } from "./sections/EditTrip/pages/ListTrips";
import { EditTrip } from "./sections/EditTrip/pages/EditTrip";

function App() {
  return (
    <CreateTrip>
      <HashRouter>
        <main className="transition-all select-none bg-[url('https://acortar.link/lpmbDO')] bg-no-repeat  bg-center bg-cover">
          <NavBar />
          <section className="mb-[100px] w-[85%] max-w-[1300px] mx-auto flex flex-col justify-center min-h-[100vh]">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
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
              <Route
                path="/assign-truck/list"
                element={<ListTripsWithoutTruck />}
              />
              <Route
                path="/trip/assign-truck/:trip/:date"
                element={<TruckAvailable />}
              />
              <Route
                path="/trip-without-details/:trip/"
                element={<DetailsTrip />}
              />
              <Route
                path="/trips-without-init/"
                element={<TripsWithoutStart />}
              />
              <Route
                path="/trip-without-details/:trip/"
                element={<DetailsTrip />}
              />
              <Route path="/create/user" element={<CreateUser />} />
              <Route path="/create/user/:role" element={<DataUser />} />
              <Route path="/trucks" element={<Trucks />} />
              <Route path="/trips" element={<ListTrips />} />
              <Route path="/trip-edit/:idTripEncript" element={<EditTrip />} />
              
            </Routes>
          </section>
          <Footer />
        </main>
      </HashRouter>
    </CreateTrip>
  );
}

export default App;
