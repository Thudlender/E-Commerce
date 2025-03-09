import { useState } from "react";
import ProductServices from "../../services/product.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("name", product.name);
      data.set("price", product.price);
      data.set("description", product.description);
      data.set("category", product.category);
      data.set("file", product.file);
      const response = await ProductServices.addProduct(data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มรายการสินค้าสำเร็จ",
          text: response.data.message || "เพิ่มรายการสินค้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setProduct({
            name: "",
            price: 0,
            description: "",
            category: "",
            file: null,
          });
          navigate("/dashboard");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เพิ่มรายการสินค้าไม่สำเร็จ",
        text: error.response.data.message || "เพิ่มรายการสินค้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h4 className="text-lg text-center">เพิ่มรายการสินค้า</h4>
      <label className="mt-4 input input-bordered flex items-center gap-2">
        Name
        <input
          type="text"
          className="grow"
          value={product.name}
          onChange={handleChange}
          name="name"
        />
      </label>
      <textarea
        value={product.description}
        onChange={handleChange}
        name="description"
        className="textarea"
        placeholder="Bio"
      ></textarea>
      <label className="input input-bordered flex items-center gap-2">
        Price
        <input
          value={product.price}
          onChange={handleChange}
          name="price"
          type="number"
          className="grow"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        category
        <input
          value={product.category}
          onChange={handleChange}
          name="category"
          type="text"
          className="grow"
        />
      </label>
      <input
        type="file"
        name="file"
        onChange={handleChange}
        className="file-input file-input-bordered file-input-md w-full max-w-xs"
      />
      <div className="flex justify-center mt-4">
        <button onClick={handleSubmit} class="btn btn-success">
          เพิ่มรายการสินค้า
        </button>
      </div>
      {product.file && (
        <div className="flex justify-center mt-4">
          <img
            src={URL.createObjectURL(product.file)}
            alt="Product Preview"
            className="max-w-xs"
          />
        </div>
      )}
    </div>
  );
};

export default ProductAdd;