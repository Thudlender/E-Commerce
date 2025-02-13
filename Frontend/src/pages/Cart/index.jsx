import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const handleClearCart = async () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              title: "Success",
              text: response.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Deleted item successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the item.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };
  const handleIncrease = async () => {};
  const handleDecrease = async () => {};
  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The <span className="text-red">Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-red text-white rounded-sm text-center">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button className="btn btn-outline btn-error"
                    onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.length > 0 &&
                  cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {""}
                            <img
                              src={cartItem.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{cartItem.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-x-6 text-center">
                          <button className="btn btn-xs mr-6" onClick={handleDecrease}
                          >
                            -
                          </button>
                          {cartItem.quantity}
                          <button className="btn btn-xs mr-2" onClick={handleIncrease}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">{cartItem.price}</td>
                      <td className="text-center">{cartItem.quantity * cartItem.price}</td>
                      <td className="text-center"><button onClick={() => handleDeleteItem(cartItem)}>
                        <FaTrash/>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              {/* foot */}
              <tfoot>
                <tr className="bg-red text-white rounded-sm text-center">
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per</th>
                  <th>Price</th>
                  <th>
                    <button className="btn btn-outline btn-error">
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-xl font-bold text-center text-red">
            Shopping cart is Empty!
          </div> 
        )}
      </div>
    </div>
  );
};

export default index;
