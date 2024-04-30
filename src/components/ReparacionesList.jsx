import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import reparacionesService from "../services/reparaciones.service";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Calculate from "@mui/icons-material/Calculate";

const ReparacionesList = () => {
  const [reparacioness, setReparaciones] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reparacionesService
      .getAll()
      .then((response) => {
        console.log(
          "Mostrando listado de reparaciones.",
          response.data
        );
        setReparaciones(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar planilla de sueldos de los empleados.",
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
      "¿Esta seguro que desea borrar esta reparación?"
    );
    if (confirmDelete) {
      reparacionesService
        .remove(id)
        .then((response) => {
          console.log("reparación ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al reparación",
            error
          );
        });
    }
  };
  const handleEdit = (id) => {
    navigate(`/reparaciones/pagar/${id}`);
  };

  const handleCalculo = (id) => {
    navigate(`/reparaciones/calcular/${id}`);
  };


  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/reparaciones/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir Reparacion
        </Button>
      </Link>
      <br /> <br />
      <h3>Lista de reparciones realizadas</h3>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Id
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Id Vehiculo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tipo reparacion
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Monto total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Fecha Ingreso
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Fecha Salida
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Fecha Entrega
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Pagado
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reparacioness.map((reparaciones) => (
            <TableRow
              key={reparacioness.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{reparaciones.id}</TableCell>
              <TableCell align="right">{reparaciones.id_vehiculo}</TableCell>
              <TableCell align="right">{reparaciones.tipo_reparacion}</TableCell>
              <TableCell align="right">{reparaciones.monto_total}</TableCell>
              <TableCell align="right">{reparaciones.fecha_ingreso}</TableCell>
              <TableCell align="right">{reparaciones.fecha_salida}</TableCell>
              <TableCell align="right">{reparaciones.fecha_entrega_cliente}</TableCell>
              <TableCell align="right">{reparaciones.pagada? "si":"no"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(reparaciones.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Pagar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(reparaciones.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleCalculo(reparaciones.id_vehiculo)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<Calculate />}
                >
                  Calcular Total
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReparacionesList;
