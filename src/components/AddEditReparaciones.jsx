import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionesService from "../services/reparaciones.service";
import reparacionService from "../services/reparacion.service";
import vehiculosService from "../services/vehiculos.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { Typography } from "@mui/material";
import Modal from "../components/modal/modal";

const AddEditReparaciones = () => {
  const [id_vehiculo, setIdVehiculo] = useState("");
  const [tipo_reparacion, setTipoReparacion] = useState("");
  const [monto_total, setMontoTotal] = useState("");
  const [fecha_ingreso, setFechaIngreso] = useState("");
  const [fecha_salida, setFechaSalida] = useState("");
  const [fecha_entrega_cliente, setFechaEntregaCliente] = useState("");
  const { id } = useParams();
  const [titleReparacionesForm, setTitleReparacionesForm] = useState("");
  const navigate = useNavigate();
  const [reparacionesAll, setReparaciones] = useState([]);
  const [selectedReparaciones, setSelectedReparaciones] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState([]);
  const [selectedPrecio, setSelectedPrecio] = useState('');
  const [vehiculosAll, setVehiculosAll] = useState([]);
  const [errors, setErrors] = useState({});
  const [noDatos, setNoDatos] = useState('');

  const saveReparaciones = (e) => {
    e.preventDefault();

    const reparaciones = {id,id_vehiculo, tipo_reparacion, monto_total, fecha_ingreso, fecha_salida, fecha_entrega_cliente};
    if (id) {
      //Actualizar Datos edl reparaciones
      reparacionesService
        .update(reparaciones)
        .then((response) => {
          console.log("Reparaciones ha sido actualizado.", response.data);
          navigate("/reparaciones/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del reparaciones.",
            error
          );
        });
    } else {
      //Crear nuevo reparaciones
      reparacionesService
        .create(reparaciones)
        .then((response) => {
          console.log("Reparaciones ha sido añadido.", response.data);
          navigate("/reparaciones/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo reparaciones.",
            error
          );
        });
    }
  };

  const init = () => {
    reparacionService
      .getAll()
      .then((response) => {
        setReparaciones(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar obtener lista de reparacion.",
          error
        );
      });
    vehiculosService
      .getAll()
      .then((response) => {
        setVehiculosAll(response.data);
        if(response.data.length == 0){
          setNoDatos("No se han encontrado vehiculos.")
        }
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar obtener lista de vehiculos.",
          error
        );
      });
  };

  const validate = () => {
    let tempErrors = {};
    if (!id_vehiculo) tempErrors.id_vehiculo = "Vehiculo es requerido.";
    if (!tipo_reparacion) tempErrors.tipo_reparacion = "Tipo reparación es requerida.";
    if (!fecha_ingreso) tempErrors.fecha_ingreso = "Fecha de ingreso es requerida.";
    if (!fecha_salida) tempErrors.fecha_salida = "Fecha de salida es requerida.";
    if (!fecha_entrega_cliente) tempErrors.fecha_entrega_cliente = "Fecha entrega al cliente es requerida.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveReparaciones(e);
    }
  };

  useEffect(() => {
    init();
    if (id) {
      setTitleReparacionesForm("Editar reparación");
      reparacionesService
        .get(id)
        .then((reparaciones) => {
          setIdVehiculo(reparaciones.data.id_vehiculo);
          setTipoReparacion(reparaciones.data.tipo_reparacion);
          setMontoTotal(reparaciones.data.monto_total);
          setSelectedPrecio(reparaciones.data.monto_total);
          setFechaIngreso(formatDate(reparaciones.data.fecha_ingreso));
          setFechaSalida(formatDate(reparaciones.data.fecha_salida));
          setFechaEntregaCliente(formatDate(reparaciones.data.fecha_entrega_cliente));
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleReparacionesForm("Nueva Reparaciones");
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:mm
  };

  const handleChange = (event) => {
    const selectedReparacionesName = event.target.value;
    setTipoReparacion(selectedReparacionesName);
    const selectedReparaciones = reparacionesAll.find(reparacion => reparacion.nombre === selectedReparacionesName);
    vehiculosService
        .get(id_vehiculo)
        .then((vehiculo) => {
          setSelectedVehiculo(vehiculo.data);
          setSelectedReparaciones(selectedReparacionesName);
          if(selectedVehiculo.tipo_motor.includes('Gasolina')){
            setSelectedPrecio(selectedReparaciones ? 'Precio reparación sin descuentos ni cargos: '+selectedReparaciones.precioGasolina+' CLP' : '');
            setMontoTotal(selectedReparaciones ? selectedReparaciones.precioGasolina : '')
          }
          if(selectedVehiculo.tipo_motor.includes('Diesel')){
            setSelectedPrecio(selectedReparaciones ? 'Precio reparación sin descuentos ni cargos: '+selectedReparaciones.precioDiesel+' CLP' : '');
            setMontoTotal(selectedReparaciones ? selectedReparaciones.precioDiesel : '')
          }
          if(selectedVehiculo.tipo_motor.includes('Electrico')){
            setSelectedPrecio(selectedReparaciones ? 'Precio reparación sin descuentos ni cargos: '+selectedReparaciones.precioElectrico+' CLP' : '');
            setMontoTotal(selectedReparaciones ? selectedReparaciones.precioElectrico : '')
          }
          if(selectedVehiculo.tipo_motor.includes('Hibrido')){
            setSelectedPrecio(selectedReparaciones ? 'Precio reparación sin descuentos ni cargos: '+selectedReparaciones.precioHibrido+' CLP' : '');
            setMontoTotal(selectedReparaciones ? selectedReparaciones.precioHibrido : '')
          }
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
  };

  const handleChangeVeh = (event) => {
    const selectedVehiculoId = event.target.value;
    console.log(selectedVehiculoId)
    const selectedVehiculo = vehiculosAll.find(vehiculo => vehiculo.id_vehiculo === selectedVehiculoId);
    console.log(selectedVehiculo)
    setSelectedVehiculo(selectedVehiculo);
    setIdVehiculo(selectedReparaciones ? selectedVehiculo.id_vehiculo : '');
  };

  return (
    <>
      <Modal id="addEditReparaciones-modal">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
        >
          <h3> {titleReparacionesForm} </h3>
          <Typography variant="h7" style={{ marginTop: '20px' , color: 'red'}}>
            {noDatos}
          </Typography>
          <form className="w-[450px]">
          <FormControl fullWidth>
              <TextField
                id="id_vehiculo"
                label="Seleccionar vehiculo"
                value={id_vehiculo}
                select
                variant="standard"
                defaultValue="1"
                onChange={(e) => handleChangeVeh(e)}
                helperText={errors.id_vehiculo}
                error={Boolean(errors.id_vehiculo)}
              >
              {vehiculosAll.map((vehiculo) => (
                <MenuItem key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                  {vehiculo.patente} - {vehiculo.marca} - {vehiculo.modelo}
                </MenuItem>
              ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="tipo_reparacion"
                label="Seleccionar tipo de reparación"
                value={tipo_reparacion}
                select
                variant="standard"
                defaultValue="Reparaciones del Sistema de Frenos"
                onChange={(e) => handleChange(e)}
                helperText={errors.tipo_reparacion}
                error={Boolean(errors.tipo_reparacion)}
              >
              {reparacionesAll.map((repar) => (
                <MenuItem key={repar.nombre} value={repar.nombre}>
                  {repar.nombre}
                </MenuItem>
              ))}
              </TextField>
            </FormControl>
            <FormControl fullWidth>
              {selectedReparaciones && (
              <Typography variant="h6" style={{ marginTop: '20px' }}>
                {selectedPrecio}
              </Typography>
            )}
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle1" gutterBottom align="left" style={{ opacity: 0.7 , marginTop:'10px'}} >
                Fecha de ingreso al taller
              </Typography>
              <TextField
                id="fecha_ingreso"
                label=""
                value={fecha_ingreso}
                variant="standard"
                type="datetime-local"
                onChange={(e) => setFechaIngreso(e.target.value)}
                helperText={errors.fecha_ingreso}
                error={Boolean(errors.fecha_ingreso)}
              />
            </FormControl>

            <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom align="left" style={{ opacity: 0.7, marginTop:'10px' }}>
                Fecha de salida del taller
              </Typography>
              <TextField
                id="fecha_salida"
                label=""
                value={fecha_salida}
                variant="standard"
                type="datetime-local"
                onChange={(e) => setFechaSalida(e.target.value)}
                helperText={errors.fecha_salida}
                error={Boolean(errors.fecha_salida)}
              />
            </FormControl>

            <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom align="left" style={{ opacity: 0.7, marginTop:'10px' }}>
                Fecha de entrega al cliente
              </Typography>
              <TextField
                id="fecha_entrega_cliente"
                label=""
                value={fecha_entrega_cliente}
                variant="standard"
                type="datetime-local"
                onChange={(e) => setFechaEntregaCliente(e.target.value)}
                helperText={errors.fecha_entrega_cliente}
                error={Boolean(errors.fecha_entrega_cliente)}
              />
            </FormControl>
          </form>
            <Box marginTop="10px" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" gap="1rem">
              <FormControl>
                <Button
                  variant="contained"
                  color="info"
                  onClick={(e) => handleSubmit(e)}
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </Button>
              </FormControl>

              <Link to="/reparaciones/list" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Volver
                </Button>
              </Link>
            </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditReparaciones;
