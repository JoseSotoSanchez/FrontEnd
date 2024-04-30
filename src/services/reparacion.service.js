import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/reparacion');
}

export default { getAll};