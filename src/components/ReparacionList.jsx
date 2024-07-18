import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import reporteService from "../services/reporte.service";

const ReparacionList = () => {
  const [reparacion, setReparacion] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reporteService
      .getReparacionesTipo()
      .then((response) => {
        console.log("Mostrando listado de todas las reparaciones disponibles.", response.data);
        setReparacion(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas reparaciones disponibles.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  // const handleDelete = (id) => {
  //   console.log("Printing id", id);
  //   const confirmDelete = window.confirm(
  //     "¿Esta seguro que desea borrar esta Hora Extra?"
  //   );
  //   if (confirmDelete) {
  //     reparacionService
  //       .remove(id)
  //       .then((response) => {
  //         console.log("Hora Extra ha sido eliminada.", response.data);
  //         init();
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "Se ha producido un error al intentar eliminar la Hora Extra",
  //           error
  //         );
  //       });
  //   }
  // };

  // const handleEdit = (id) => {
  //   console.log("Printing id", id);
  //   navigate(`/reparacion/edit/${id}`);
  // };

  return (
    <TableContainer component={Paper}>
      <br />
      {/* <Link
        to="/reparacion/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<MoreTimeIcon />}
        >
          Ingresar Horas Extra
        </Button>
      </Link> */}
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo Sedan
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo Hatchback
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo SUV
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo Pickup
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo Furgoneta
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reparacion.map((rep) => (
            <TableRow
              key={rep.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{rep.reparacion}</TableCell>
              <TableCell align="left">{rep.tipo_sedan}</TableCell>
              <TableCell align="left">{rep.tipo_hatchback}</TableCell>
              <TableCell align="left">{rep.tipo_suv}</TableCell>
              <TableCell align="left">{rep.tipo_pickup}</TableCell>
              <TableCell align="left">{rep.tipo_furgoneta}</TableCell>
              <TableCell align="left">{rep.total}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReparacionList;
