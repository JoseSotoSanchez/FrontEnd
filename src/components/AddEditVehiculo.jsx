import { useState, useEffect, React } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculos.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Modal from "../components/modal/modal";

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
  const [errors, setErrors] = useState({}); 

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

  const validate = () => {
    let tempErrors = {};
    if (!patente) tempErrors.patente = "Patente es requerida.";
    if (patente.length != 6) tempErrors.patente = "Patente es debe tener formato AABB11 ó EE1122.";
    if (!marca) tempErrors.marca = "Marca es requerida.";
    if (!modelo) tempErrors.modelo = "Modelo es requerido.";
    if (!tipo) tempErrors.tipo = "Tipo es requerido.";
    if (!anio_fabricacion) tempErrors.anio_fabricacion = "Año de fabricación es requerido.";
    if (!tipo_motor) tempErrors.tipo_motor = "Tipo de motor es requerido.";
    if (!numero_asientos) tempErrors.numero_asientos = "Número de asientos es requerido.";
    if (!kilometraje) tempErrors.kilometraje = "Kilometraje es requerido.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveVehiculo(e);
    }
  };

  const handlePatenteChange = (e) => {
    const value = e.target.value.toUpperCase();
    const regex = /^[A-Z0-9]*$/;
    if (regex.test(value)) {
      setPatente(value);
      setErrors({ ...errors, patente: '' });
    } else {
      setErrors({ ...errors, patente: 'Solo letras y números en mayúsculas' });
    }
  };
  const handleAsientosChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setAsientos(value);
      setErrors({ ...errors, numero_asientos: '' });
    } else {
      setErrors({ ...errors, numero_asientos: 'Máximo 1 dígito' });
    }
  };
  const handleKilometrajeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setKilometraje(value);
      setErrors({ ...errors, kilometraje: '' });
    } else {
      setErrors({ ...errors, kilometraje: 'Máximo 6 dígitos' });
    }
  };
  const handleAnioChange = (e) => {
    const value = e.target.value;
    const currentYear = new Date().getFullYear();
    if (value.length <= 4) {
      if (value <= currentYear + 1) {
        setAnio(value);
        setErrors({ ...errors, anio_fabricacion: '' });
      } else {
        setErrors({ ...errors, anio_fabricacion: 'Máximo año posterior al año actual' });
      }
    } else {
      setErrors({ ...errors, anio: 'Máximo 4 dígitos' });
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
    <>
      <Modal id='addEditVehiculo-modal'>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
        >
          <h3> {titleVehiculoForm} </h3>
          <form className="w-[450px]">
          <FormControl fullWidth>
            <TextField
              id="patente"
              label="Patente. Ej. AABB99 o AA1122"
              value={patente}
              variant="standard"
              onChange={handlePatenteChange}
              helperText={errors.patente}
              error={Boolean(errors.patente)}
              required
              inputProps={{ maxLength: 6 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="marca"
              label="Marca. Ej. Toyota"
              value={marca}
              variant="standard"
              onChange={(e) => setMarca(e.target.value)}
              helperText={errors.marca}
              error={Boolean(errors.marca)}
              required
              inputProps={{ maxLength: 10 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="modelo"
              label="Modelo del vehiculo. Ej. Corolla"
              value={modelo}
              variant="standard"
              onChange={(e) => setModelo(e.target.value)}
              helperText={errors.modelo}
              error={Boolean(errors.modelo)}
              required
              inputProps={{ maxLength: 10 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="tipo"
              label="Seleccionar tipo"
              value={tipo}
              select
              variant="standard"
              onChange={(e) => setTipo(e.target.value)}
              helperText={errors.tipo}
              error={Boolean(errors.tipo)}
              required
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
              label="Año de fabricación. Ej. 2010"
              type="number"
              value={anio_fabricacion}
              variant="standard"
              onChange={handleAnioChange}
              helperText={errors.anio_fabricacion}
              error={Boolean(errors.anio_fabricacion)}
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="tipo_motor"
              label="Seleccione tipo de motor"
              value={tipo_motor}
              select
              variant="standard"
              onChange={(e) => setTipoMotor(e.target.value)}
              helperText={errors.tipo_motor}
              error={Boolean(errors.tipo_motor)}
              required
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
              label="Cantidad de asientos. Ej. 5"
              type="number"
              value={numero_asientos}
              variant="standard"
              onChange={handleAsientosChange}
              helperText={errors.numero_asientos}
              error={Boolean(errors.numero_asientos)}
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="kilometraje"
              label="Kilometraje actual. Ej. 440000"
              type="number"
              value={kilometraje}
              variant="standard"
              onChange={handleKilometrajeChange}
              helperText={errors.kilometraje}
              error={Boolean(errors.kilometraje)}
              required
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

            <Link to="/vehiculos/list" style={{ textDecoration: "none" }}>
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

export default AddEditVehiculo;
