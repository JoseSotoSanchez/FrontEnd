import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionesService from "../services/reparaciones.service";
import Box from "@mui/material/Box";


const CalcularReparaciones = () => {
  const [valor, setValor] = useState("");
  const { id } = useParams();
  const [titleReparacionesForm, setTitleReparacionesForm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setTitleReparacionesForm("Monto Calculado");
      reparacionesService
        .getCalculo(id)
        .then((monto) => {
          setValor(monto.data);
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
      <h3> $ {valor} .- </h3>
      <Link to="/reparaciones/list">Back to List</Link>
    </Box>
  );
};

export default CalcularReparaciones;
