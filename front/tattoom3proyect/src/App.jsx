import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "./views/Home/Home";
import Navbar from "./components/navbar/Navbar";
import MisTurnosTattoo from "./views/MisTurnos/MisTurnosTattoo";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Jaztattoo from "./views/Jaztattoo/Jaztattoo";
import CreateAppointment from "./views/CreateAppointment/CreateAppointment";  

function App() {

  const location = useLocation();

  return (
<>
{location.pathname !== '/' && <Navbar />}
<Routes>

        <Route path="/" element={<Jaztattoo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/turnos" element={<MisTurnosTattoo />} />
        <Route path="/crear-turno" element={<CreateAppointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
  </>
  );
}

export default App;
