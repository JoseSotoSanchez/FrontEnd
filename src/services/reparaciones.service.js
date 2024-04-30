import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/api/v1/reparaciones/id/${id}`);
}

const getAll = () => {
    return httpClient.get('/api/v1/reparaciones');
}

const create = data => {
    return httpClient.post("/api/v1/reparaciones/guardar", data);
}

const update = data => {
    return httpClient.put('/api/v1/reparaciones/pagar', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/reparaciones/id/${id}`);
}

const getCalculo = id => {
    return httpClient.get(`/api/v1/reparaciones/calcular/${id}`);
}

export default { getAll, create, get, update, remove, getCalculo};