import api from "./api";
const API_URL = "http://localhost:5000/api/v1/product";

const getAllProducts = async () => {
  //http://localhost:5173/product.json
  return await api.get(`${API_URL}`);
};

const getProductByID = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const addProduct = async (product) => {
  return await api.post(`${API_URL}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProduct = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ProductServices = {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductByID,
};
export default ProductServices;