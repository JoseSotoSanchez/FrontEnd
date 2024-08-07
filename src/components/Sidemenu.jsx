import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChecklistRtl from "@mui/icons-material/ChecklistRtl";
import BuildCircle from "@mui/icons-material/BuildCircle";
import Summarize from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { CalculateRounded, CarRepair } from "@mui/icons-material";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/vehiculos/list")}>
          <ListItemIcon>
            <CarRepair />
          </ListItemIcon>
          <ListItemText primary="Vehiculos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reparaciones/list")}>
          <ListItemIcon>
            <BuildCircle />
          </ListItemIcon>
          <ListItemText primary="Reparaciones" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/calculatotal")}>
          <ListItemIcon>
            <CalculateRounded />
          </ListItemIcon>
          <ListItemText primary="Calcular total" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reportes/list")}>
          <ListItemIcon>
            <Summarize />
          </ListItemIcon>
          <ListItemText primary="Reporte valores involucrados" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reparacion/list")}>
          <ListItemIcon>
            <ChecklistRtl />
          </ListItemIcon>
          <ListItemText primary="Reporte reparaciones" />
        </ListItemButton>
      
        <ListItemButton onClick={() => navigate("/reportes/promedio/list")}>
          <ListItemIcon>
            <ChecklistRtl />
          </ListItemIcon>
          <ListItemText primary="Reporte promedios reparaciones" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reportes/reparacion/motor/list")}>
          <ListItemIcon>
            <ChecklistRtl />
          </ListItemIcon>
          <ListItemText primary="Reporte reparaciones tipo motor" />
        </ListItemButton>
      </List>

      <Divider />

      {/* <List>
        <ListItemButton onClick={() => navigate("/employee/discounts")}>
          <ListItemIcon>
            <DiscountIcon />
          </ListItemIcon>
          <ListItemText primary="Descuentos" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/paycheck/vacations")}>
          <ListItemIcon>
            <HailIcon />
          </ListItemIcon>
          <ListItemText primary="Vacaciones" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/paycheck/medicalleave")}>
          <ListItemIcon>
            <MedicationLiquidIcon />
          </ListItemIcon>
          <ListItemText primary="Licencias Medicas" />
        </ListItemButton>
      </List> */}
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
