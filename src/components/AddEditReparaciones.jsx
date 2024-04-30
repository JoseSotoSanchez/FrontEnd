import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionesService from "../services/reparaciones.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

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

  useEffect(() => {
    if (id) {
      setTitleReparacionesForm("Pagar Reparaciones");
      reparacionesService
        .get(id)
        .then((reparaciones) => {
          setIdVehiculo(reparaciones.data.id_vehiculo);
          setTipoReparacion(reparaciones.data.tipo_reparacion);
          setMontoTotal(reparaciones.data.monto_total);
          setFechaIngreso(reparaciones.data.fecha_ingreso);
          setFechaSalida(reparaciones.data.fecha_salida);
          setFechaEntregaCliente(reparaciones.data.fecha_entrega_cliente);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleReparacionesForm("Nueva Reparaciones");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleReparacionesForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="id_vehiculo"
            label="id_vehiculo"
            value={id_vehiculo}
            variant="standard"
            onChange={(e) => setIdVehiculo(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="tipo_reparacion"
            label="tipo_reparacion"
            value={tipo_reparacion}
            select
            variant="standard"
            defaultValue="Reparaciones del Sistema de Frenos"
            onChange={(e) => setTipoReparacion(e.target.value)}
            style={{ width: "25%" }}
          >
            <MenuItem value={"Reparaciones del Sistema de Frenos"}>Reparaciones del Sistema de Frenos</MenuItem>
            <MenuItem value={"Servicio del Sistema de Refrigeración"}>Servicio del Sistema de Refrigeración</MenuItem>
            <MenuItem value={"Reparaciones del Motor"}>Reparaciones del Motor</MenuItem>
            <MenuItem value={"Reparaciones de la Transmisión"}>Reparaciones de la Transmisión</MenuItem>
            <MenuItem value={"Reparación del Sistema Eléctrico"}>Reparación del Sistema Eléctrico</MenuItem>
            <MenuItem value={"Reparaciones del Sistema de Escape"}>Reparaciones del Sistema de Escape</MenuItem>
            <MenuItem value={"Reparación de Neumáticos y Ruedas"}>Reparación de Neumáticos y Ruedas</MenuItem>
            <MenuItem value={"Reparaciones de la Suspensión y la Dirección"}>Reparaciones de la Suspensión y la Dirección</MenuItem>
            <MenuItem value={"Reparación del Sistema de Aire Acondicionado y Calefacción"}>Reparación del Sistema de Aire Acondicionado y Calefacción</MenuItem>
            <MenuItem value={"Reparaciones del Sistema de Combustible"}>Reparaciones del Sistema de Combustible</MenuItem>
            <MenuItem value={"Reparación y Reemplazo del Parabrisas y Cristales"}>Reparación y Reemplazo del Parabrisas y Cristales</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="monto_total"
            label="monto_total"
            value={monto_total}
            variant="standard"
            onChange={(e) => setMontoTotal(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="fecha_ingreso"
            label="fecha_ingreso"
            value={fecha_ingreso}
            variant="standard"
            type="datetime-local"
            onChange={(e) => setFechaIngreso(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="fecha_salida"
            label="fecha_salida"
            value={fecha_salida}
            variant="standard"
            type="datetime-local"
            onChange={(e) => setFechaSalida(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="fecha_entrega_cliente"
            label="fecha_entrega_cliente"
            value={fecha_entrega_cliente}
            variant="standard"
            type="datetime-local"
            onChange={(e) => setFechaEntregaCliente(e.target.value)}
          />
        </FormControl>



        {/* <FormControl fullWidth>
          <TextField
            id="category"
            label="Category"
            value={category}
            select
            variant="standard"
            defaultValue="A"
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "25%" }}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </TextField>
        </FormControl> */}

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => saveReparaciones(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/reparaciones/list">Back to List</Link>
    </Box>
  );
};

export default AddEditReparaciones;
