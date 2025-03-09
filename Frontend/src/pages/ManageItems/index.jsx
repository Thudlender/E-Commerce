import React, { useEffect, useState } from "react";
import ProductServices from "../../services/product.service";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // เก็บข้อมูลสินค้าที่แก้ไข
  const [selectedImage, setSelectedImage] = useState(null); // เก็บไฟล์รูปใหม่

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductServices.getAllProducts();
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจว่าจะลบสินค้าชิ้นนี้",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ProductServices.deleteProduct(id);
          const newProducts = products.filter((product) => product._id !== id);
          setProducts(newProducts);
          Swal.fire({
            icon: "success",
            title: "ลบสินค้าสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ลบสินค้าไม่สำเร็จ",
        text: error.response?.data?.message || "ลบสินค้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product }); // คัดลอกข้อมูลสินค้า
    setSelectedImage(null); // เคลียร์ไฟล์ใหม่
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    // แสดงตัวอย่างรูปภาพใหม่
    if (file) {
      setEditProduct((prev) => ({
        ...prev,
        image: URL.createObjectURL(file), // ใช้สำหรับ preview
      }));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditProduct(null);
    setSelectedImage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    try {
      const response = await ProductServices.updateProduct(editProduct._id, formData);
      const updatedProduct = response.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      handleModalClose(); // ปิด modal หลังสำเร็จ
      Swal.fire({
        icon: "success",
        title: "อัพเดทข้อมูลสินค้าสำเร็จ",
        showConfirmButton: false,
        timer: 1800,
      });
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "อัพเดทข้อมูลสินค้าไม่สำเร็จ",
        text: error.response?.data?.message || "อัพเดทข้อมูลสินค้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };

  return (
    <div className="w-screen max-w-full overflow-x-auto">
      <div className="w-full overflow-x-auto">
        <table className="table w-full min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.price}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.category}
                </td>
                <td className="border border-gray-300 text-center align-middle">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 hover:bg-yellow-200 rounded-lg"
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="hover:bg-rose-200 rounded-lg"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* ModalEditForm */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={editProduct?.name || ""}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description:</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={editProduct?.description || ""}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="file">
                  <span className="label-text">File Photo:</span>
                </label>
                {/* แสดงรูปภาพเดิม */}
                {editProduct?.image && !selectedImage && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={editProduct.image}
                      alt={editProduct.name}
                      className="max-w-xs"
                    />
                  </div>
                )}
                {/* แสดงตัวอย่างรูปภาพใหม่ */}
                {selectedImage && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="New Product Preview"
                      className="max-w-xs"
                    />
                  </div>
                )}
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="file-input file-input-neutral mt-2"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price:</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={editProduct?.price || ""}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category:</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={editProduct?.category || ""}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;