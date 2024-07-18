import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/api/v1/vehiculos/id/${id}`);
}

const getAll = () => {
    return httpClient.get('/api/v1/vehiculos');
}

const getAllNoPagados = () => {
    return httpClient.get('/api/v1/vehiculos/nopagados');
}

const create = data => {
    return httpClient.post("/api/v1/vehiculos/guardar", data);
}

const update = data => {
    return httpClient.put('/api/v1/vehiculos', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/vehiculos/${id}`);
}

const guardarTotal = (id, total) => {
    return httpClient.post(`/api/v1/vehiculos/guardatotal/${id}/${total}`);
}


export default { getAll, create, get, update, remove, getAllNoPagados, guardarTotal};