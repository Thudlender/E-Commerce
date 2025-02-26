import api from "./api";
const API_URL = "/cartItems";

const getAllCartItems = async () => {
    return await api.get(`${API_URL}`);
};
const getCartItemsByEmail = async (email) => {
    return await api.get(`${API_URL}/$(email)`);
};
const createCartItem = async () => {
    return await api.post(`${API_URL}`)
};
const updateCartItem = async (id, data) => {
    return await api.put(`${API_URL}/${id}`, data);
};
const clearAllItems = async () => {
    return await api.delete(`${API_URL}$(id)`);
};
const deleteCartItem = async () => {
    return await api.delete(`${API_URL}/clear/${email}`);
};
 
const CartService = {
    getAllCartItems,
    getCartItemsByEmail,
    createCartItem,
    updateCartItem,
    deleteCartItem,
    clearAllItems,
};

export default CartService;

