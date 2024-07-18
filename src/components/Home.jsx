import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Typography } from '@mui/material';
import reparacionesService from "../services/reparaciones.service";


const Home = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [noDatos, setNoDatos] = useState('');
  const navigate = useNavigate();

  const init = () => {
    reparacionesService
      .getUltimos()
      .then((response) => {
        console.log("Mostrando listado de reparaciones.", response.data);
        if(response.data.length == 0){
          setNoDatos("No se han encontrado reparaciones recientes")
        }
        setReparaciones(response.data);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar planilla de sueldos de los empleados.", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  // Funciones para manejar la navegación
  const vehiculo = () => {
    navigate('/vehiculos/add');
  };

  const reparacion = () => {
    navigate('/reparaciones/add');
  };

  const total = () => {
    navigate('/calculatotal');
  };
  return (
    <>
      <div>
        <h2>Últimas reparaciones</h2>
      </div>
      <TableContainer component={Paper}>
      <hr />
      <Typography variant="h7" style={{ marginTop: '20px' , color: 'red'}}>
            {noDatos}
          </Typography>
        <hr />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Patente</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Marca</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Modelo</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Año</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Reparación</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Fecha Reparación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reparaciones.map((reparacion) => (
              <TableRow
                key={reparacion.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{reparacion.patente}</TableCell>
                <TableCell align="right">{reparacion.marca}</TableCell>
                <TableCell align="right">{reparacion.modelo}</TableCell>
                <TableCell align="right">{reparacion.anio}</TableCell>
                <TableCell align="right">{reparacion.reparacion}</TableCell>
                <TableCell align="right">{formatDateTime(reparacion.fecha_reparacion)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <br></br>
      <div>
        <Button variant="contained" onClick={vehiculo} className="custom-button" style={{ marginRight: '60px' }}>
          Añadir vehiculo
        </Button>
        <Button variant="contained" onClick={reparacion} className="custom-button" style={{ marginRight: '60px' }}>
          Añadir reparación
        </Button>
        <Button variant="contained" onClick={total} className="custom-button">
          Calcular Total
        </Button>
      </div>
    </>
  );
};
export default Home;
