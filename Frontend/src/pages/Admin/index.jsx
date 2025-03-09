import React, { useState, useEffect } from "react";
import CardItemsAdmin from "../../components/CardItemsAdmin";
import ProductServices from "../../services/product.service";

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.getAllProducts();
        const data = response.data;
        setProducts(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4" id="admin-page">
     {products.length > 0 &&
            products.map((item, index) => {
              return <CardItemsAdmin items={item} key={index} />;
            })}
    </div>
  );
};

export default AdminPage;