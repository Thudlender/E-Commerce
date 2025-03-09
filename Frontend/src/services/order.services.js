import api from "./api";
const API_URL = "/order";
const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
};
const getOrderById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};
const updateDeliveryStatus = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};
const deleteOrderById = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};
const OrderService = {
  getAllOrders,
  getOrderById,
  updateDeliveryStatus,
  deleteOrderById,
};
export default OrderService;