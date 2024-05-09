import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculos.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { Container, TableContainer } from "@mui/material";

const AddEditVehiculo = () => {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [anio_fabricacion, setAnio] = useState("");
  const [tipo_motor, setTipoMotor] = useState("");
  const [numero_asientos, setAsientos] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [id_vehiculo, setId] = useState("");
  const { id } = useParams();
  const [titleVehiculoForm, setTitleVehiculoForm] = useState("");
  const navigate = useNavigate();

  const saveVehiculo = (e) => {
    e.preventDefault();

    const vehiculo = { patente, marca, modelo, tipo, anio_fabricacion,tipo_motor, numero_asientos,kilometraje,id_vehiculo };
    if (id) {
      //Actualizar Datos edl vehiculo
      vehiculoService
        .update(vehiculo)
        .then((response) => {
          console.log("Vehiculo ha sido actualizado.", response.data);
          navigate("/vehiculos/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del vehiculo.",
            error
          );
        });
    } else {
      //Crear nuevo vehiculo
      vehiculoService
        .create(vehiculo)
        .then((response) => {
          console.log("Vehiculo ha sido añadido.", response.data);
          navigate("/vehiculos/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo vehiculo.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleVehiculoForm("Editar Vehiculo");
      vehiculoService
        .get(id)
        .then((vehiculo) => {
          setId(vehiculo.data.id_vehiculo);
          setPatente(vehiculo.data.patente);
          setMarca(vehiculo.data.marca);
          setModelo(vehiculo.data.modelo);
          setTipo(vehiculo.data.tipo);
          setAnio(vehiculo.data.anio_fabricacion);
          setTipoMotor(vehiculo.data.tipo_motor);
          setAsientos(vehiculo.data.numero_asientos);
          setKilometraje(vehiculo.data.kilometraje);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleVehiculoForm("Nuevo Vehiculo");
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
      <h3> {titleVehiculoForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="patente"
            label="patente"
            value={patente}
            variant="standard"
            onChange={(e) => setPatente(e.target.value)}
            helperText="Ej. AABB99 o AA1122"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="marca"
            label="marca"
            value={marca}
            variant="standard"
            onChange={(e) => setMarca(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="modelo"
            label="modelo"
            value={modelo}
            variant="standard"
            onChange={(e) => setModelo(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="tipo"
            label="tipo"
            value={tipo}
            select
            variant="standard"
            defaultValue="Tipos"
            onChange={(e) => setTipo(e.target.value)}
            style={{ width: "100%" }}
          >
            <MenuItem value={"SUV"}>SUV</MenuItem>
            <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
            <MenuItem value={"Sedan"}>Sedán</MenuItem>
             <MenuItem value={"Pickup"}>Pickup</MenuItem>
             <MenuItem value={"Furgoneta"}>Furgoneta</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="anio_fabricacion"
            label="anio_fabricacion"
            type="number"
            value={anio_fabricacion}
            variant="standard"
            onChange={(e) => setAnio(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="tipo_motor"
            label="tipo_motor"
            value={tipo_motor}
            select
            variant="standard"
            defaultValue="Tipo motor"
            onChange={(e) => setTipoMotor(e.target.value)}
            style={{ width: "100%" }}
          >
            <MenuItem value={"Gasolina"}>Gasolina</MenuItem>
            <MenuItem value={"diesel"}>Diesel</MenuItem>
            <MenuItem value={"Hibrido"}>Hibrido</MenuItem>
             <MenuItem value={"Electrico"}>Electrico</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="numero_asientos"
            label="numero_asientos"
            type="number"
            value={numero_asientos}
            variant="standard"
            onChange={(e) => setAsientos(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="kilometraje"
            label="kilometraje"
            type="number"
            value={kilometraje}
            variant="standard"
            onChange={(e) => setKilometraje(e.target.value)}
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
            onClick={(e) => saveVehiculo(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/vehiculos/list">Back to List</Link>
    </Box>
  );
};

export default AddEditVehiculo;
