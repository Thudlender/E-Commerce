import api from "./api";
const API_URL = "/stripe";
 
const createCheckPutSession = async (data) => {
    return await api.post(`${API_URL}/create-checkput-session`, data);
};

const stripsService = {
    createCheckPutSession,
};
export default stripsService;
