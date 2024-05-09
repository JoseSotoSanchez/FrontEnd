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
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReportePromedioList = () => {
  const [reportes, setReportePromedio] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reporteService
      .getPromedioHoras()
      .then((response) => {
        console.log(
          "Mostrando listado de reportes.",
          response.data
        );
        setReportePromedio(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar reporte.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <TableContainer component={Paper}>

      <h3>Detalle promedio tiempo reparaciones </h3>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Id
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Marca
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tiempo Promedio (horas)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map((reporte) => (
            <TableRow
              key={reportes.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{reporte.id}</TableCell>
              <TableCell align="right">{reporte.marca}</TableCell>
              <TableCell align="right">{reporte.tiempoPromedio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportePromedioList;
