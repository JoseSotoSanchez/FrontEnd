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
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {InputAdornment, IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';


const ReporteList = () => {
  const [reportes, setReporte] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [noDatos, setNoDatos] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredVehiculos(
      reportes.filter((Reporte) =>
        `${Reporte.patente} ${Reporte.marca} ${Reporte.modelo}`.toLowerCase().includes(term.toLowerCase())
      )
    );
    if (term == "" ) {
      setNoResultsMessage('');
    } else if (reportes.filter((Reporte) =>
      `${Reporte.patente} ${Reporte.marca} ${Reporte.modelo}`.toLowerCase().includes(term.toLowerCase())
    ).length == 0) {
      setNoResultsMessage('No se encontraron vehículos que coincidan con la búsqueda.');
    } else {
      setNoResultsMessage('');
    }
  };
  
  const init = () => {
    reporteService
      .getAll()
      .then((response) => {
        console.log(
          "Mostrando listado de reportes.",
          response.data
        );
        if(response.data.length == 0){
          setNoDatos("No se han encontrado reparaciones")
        }
        setReporte(response.data);
        setFilteredVehiculos(response.data);
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
      <h4>Reporte de valor involucrados para el monto total</h4>
      {noResultsMessage && (
        <Typography variant="body1" style={{ marginTop: '20px' , color: 'red'}}>
          {noResultsMessage}
        </Typography>
      )}
    <form style={{ maxWidth: '250px', margin: 'auto', marginTop:'20px' }}>
    <Box marginTop="10px" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" gap="1rem">
      <FormControl fullWidth style={{ marginBottom: '2rem' }}>
        <TextField
          id="search"
          label="Buscar por patente"
          value={searchTerm}
          variant="outlined"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: '#888' }} />
              </InputAdornment>
            ),
            style: { borderRadius: '25px', padding: '0 10px' }
          }}
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '25px',
            padding: '0 10px',
            outline: 'none'
          }}
        />
      </FormControl>
      </Box>
    </form>
    <Typography variant="h7" style={{ marginTop: '20px' , color: 'red'}}>
        {noDatos}
      </Typography>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Valor sumado
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Detalle
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredVehiculos.map((reporte) => (
            <TableRow
              key={filteredVehiculos.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{reporte.patente}</TableCell>
              <TableCell align="right">{reporte.valor}</TableCell>
              <TableCell align="right">{reporte.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReporteList;
