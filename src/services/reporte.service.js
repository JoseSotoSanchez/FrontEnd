import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/reporte/valores');
}

const getReparacionesTipo = () => {
    return httpClient.get('/api/v1/reporte/reparaciones/tipo');
}

const getPromedioHoras = () => {
    return httpClient.get('/api/v1/reporte/reparaciones/promedio');
}

const getReparacionesTipoMotor = () => {
    return httpClient.get('/api/v1/reporte/reparaciones/tipoMotor');
}

export default { getAll, getReparacionesTipo, getPromedioHoras, getReparacionesTipoMotor};