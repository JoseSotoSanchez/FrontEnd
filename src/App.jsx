import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import VehiculosList from './components/VehiculosList';
import AddEditVehiculo from './components/AddEditVehiculo';
import ReparacionList from './components/ReparacionList';
import AddEditReparaciones from './components/AddEditReparaciones';
import CalcularReparaciones from './components/CalcularReparaciones';
import NotFound from './components/NotFound';
import ReparacionesList from './components/ReparacionesList';
import ReporteList from './components/ReporteList';

function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/vehiculos/list" element={<VehiculosList/>} />
              <Route path="/vehiculos/add" element={<AddEditVehiculo/>} />
              <Route path="/vehiculos/edit/:id" element={<AddEditVehiculo/>} />
              <Route path="/reparaciones/list" element={<ReparacionesList/>} />
              <Route path="/reparaciones/add" element={<AddEditReparaciones/>} />
              <Route path="/reparaciones/pagar/:id" element={<AddEditReparaciones/>} />
              <Route path="/reparaciones/calcular/:id" element={<CalcularReparaciones/>} />
              <Route path="/reportes/list" element={<ReporteList/>} />
              <Route path="/reparacion/list" element={<ReparacionList/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
