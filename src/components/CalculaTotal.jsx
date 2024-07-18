import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import vehiculosService from "../services/vehiculos.service";
import reparacionesService from "../services/reparaciones.service";
import Button from "@mui/material/Button";
import Payments from "@mui/icons-material/Payments";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Radio, RadioGroup, FormControlLabel, FormLabel, Typography } from '@mui/material';

const CalculaTotal = () => {

  const [id_vehiculo, setIdVehiculo] = useState('');
  const [reportes, setReporte] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [SelectedVehiculo, setSelectedVehiculo] = useState([]);
  const [errors, setErrors] = useState({}); 
  const [selectedReparaciones, setSelectedReparaciones] = useState([]);
  const [selectedPrecio, setSelectedPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [noDatos, setNoDatos] = useState('');
  

  const navigate = useNavigate();

  const saveTotal = (e) => {
    e.preventDefault();
    reparacionesService
      .pagar(id_vehiculo)
      .then((response) => {
        console.log("se ha realizado el pago.", response.data);
        navigate("/reparaciones/list");
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar pagar la reparación.",
          error
        );
      });
  };

  const init = () => {
    vehiculosService
      .getAllNoPagados()
      .then((response) => {
        console.log(
          "Mostrando vehiculos no pagados.",
          response.data
        );
        if(response.data.length == 0){
          setNoDatos("No se han encontrado vehiculos con reparaciones sin pagar")
        }
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar reporte.",
          error
        );
      });
  };

  const validate = () => {
    let tempErrors = {};
    if (!id_vehiculo) tempErrors.id_vehiculo = "Debe seleccionar un vehiculo.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChangeVeh = (event) => {
    const selectedVehiculoId = event.target.value;
    const selectedVehiculo = vehiculos.find(vehiculo => vehiculo.id_vehiculo === selectedVehiculoId);
    setSelectedVehiculo(selectedVehiculo);
    setIdVehiculo(selectedVehiculoId);
    console.log("total reparaciones antes de calcular")
    console.log(selectedVehiculo.totalReparaciones)
    if(selectedVehiculo.totalReparaciones == ""){
      reparacionesService
      .getCalculo(selectedVehiculoId)
      .then((response) => {
        console.log("Obtienendo calculo deuda de: ", response.data);
        setSelectedPrecio(response.data)
        vehiculosService.guardarTotal(selectedVehiculoId, response.data).then((response) => {
            console.log("Total guardado: ", response.data);
          })
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar calcular total de la reparación.",
          error
        );
      });
    }else{
      setSelectedPrecio(selectedVehiculo.totalReparaciones);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const confirmDelete = window.confirm(
        "¿Esta seguro que desea terminar el trabajo?"
      );
      if (confirmDelete) {
        saveTotal(e);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <TableContainer component={Paper}>
      <h2>Calcular total reparación por vehículo </h2>
      <Typography variant="h7" style={{ marginTop: '20px' , color: 'red'}}>
        {noDatos}
      </Typography>
      <Box
        component="form"
        sx={{
          width: '450px',
          padding: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          margin: 'auto',
        }}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            id="id_vehiculo"
            label="Seleccionar vehículo"
            value={id_vehiculo}
            select
            variant="standard"
            defaultValue="1"
            onChange={(e) => handleChangeVeh(e)}
            helperText={errors.id_vehiculo}
            error={Boolean(errors.id_vehiculo)}
          >
            {vehiculos.map((vehiculo) => (
              <MenuItem key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                {vehiculo.patente} - {vehiculo.marca} - {vehiculo.modelo}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup
            aria-label="descuento"
            name="descuento"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          >
            <FormControlLabel value="descuento" control={<Radio />} label="descuento por bono" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          {selectedReparaciones && (
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Total a pagar: {selectedPrecio} CLP. incluye IVA
          </Typography>
        )}
        </FormControl>
        <FormControl>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => handleSubmit(e)}
                startIcon={<Payments />}
              >
                Terminar trabajo y pagar
              </Button>
            </FormControl>
      </Box>
    </TableContainer>
  );
};

export default CalculaTotal;
