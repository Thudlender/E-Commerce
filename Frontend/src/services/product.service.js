import api from "./api";
const API_URL = "http://localhost:5000/api/v1/product";

const getAllProducts = async () => {
  //http://localhost:5173/product.json
  return await api.get(`${API_URL}`);
};

const ProductServices = {
  getAllProducts,
};
export default ProductServices;
