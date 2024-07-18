import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehiculosService from "../services/vehiculos.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import '../index.css';
import { Typography } from '@mui/material';


const VehiculosList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [noDatos, setNoDatos] = useState('');

  const navigate = useNavigate();

  const init = () => {
    vehiculosService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los vehiculos.", response.data);
        if(response.data.length == 0){
          setNoDatos("No se han encontrado vehiculos cargados")
        }
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los vehiculos.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehiculo?"
    );
    if (confirmDelete) {
      vehiculosService
        .remove(id)
        .then((response) => {
          console.log("vehiculo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al vehiculo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/vehiculos/edit/${id}`);
  };

  return (
    <>
    <div>
        <h2>Lista de reparaciones</h2>
      </div>
      <TableContainer component={Paper}>
        <br />
        <Link
          to="/vehiculos/add"
          style={{ textDecoration: "none", marginBottom: "1rem" }}
        >
          <Button
            variant="contained"
            color="primary"
            className="custom-button"
            startIcon={<PersonAddIcon />}
          >
            Añadir Vehiculo
          </Button>
        </Link>
        <br /> <br />
        <Typography variant="h7" style={{ marginTop: '20px' , color: 'red'}}>
        {noDatos}
      </Typography>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Patente
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Marca
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Modelo
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tipo Vehiculo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Año
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo Motor
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Asientos
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Kilometraje
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculos.map((vehiculo) => (
              <TableRow
                key={vehiculo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{vehiculo.patente}</TableCell>
                <TableCell align="left">{vehiculo.marca}</TableCell>
                <TableCell align="right">{vehiculo.modelo}</TableCell>
                <TableCell align="right">{vehiculo.tipo}</TableCell>
                <TableCell align="right">{vehiculo.anio_fabricacion}</TableCell>
                <TableCell align="right">{vehiculo.tipo_motor}</TableCell>
                <TableCell align="right">{vehiculo.numero_asientos}</TableCell>
                <TableCell align="right">{vehiculo.kilometraje}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleEdit(vehiculo.id_vehiculo)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(vehiculo.id_vehiculo)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
};

export default VehiculosList;
