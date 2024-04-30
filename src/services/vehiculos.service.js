import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/api/v1/vehiculos/id/${id}`);
}

const getAll = () => {
    return httpClient.get('/api/v1/vehiculos');
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

export default { getAll, create, get, update, remove};