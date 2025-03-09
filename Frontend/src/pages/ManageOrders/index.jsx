import React, { useState, useEffect } from "react";
import OrderService from "../../services/order.services";
import Swal from "sweetalert2";
import OrderDetail from "../../components/OrderDetail";
import { MdDelete } from "react-icons/md";

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // Pagination state
  const [ordersPerPage] = useState(5);  // Set orders per page
  
  useEffect(() => {
    const getAllOrders = async () => {
      try {            
        const response = await OrderService.getAllOrders();      
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(error);
      }
    };
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.updateDeliveryStatus(orderId, {
            delivery_status: newStatus,
          });

          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };

  // Calculate pagination indices
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Transactions</h2>
          <p className="text-gray-600">Details about the last transactions</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Payment Status</th>
                <th className="p-4 text-left">Delivery Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{order._id}</td>
                  <td className="p-4 text-gray-900">{order.email}</td>
                  <td className="p-4 text-gray-900">${order.total}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      value={order.delivery_status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="delivered">Delivered</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Pending</option>
                    </select>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-700"
                            onClick={() => {
                              setSelectedOrderID(order._id);
                              document.getElementById("orderDetail").showModal();
                            }}
                    >Detail</button>
                    <button className="text-red">
                      <MdDelete className="w-8 h-8" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <ModalOrderdt orderDetail="orderDetail" orderID={selectedOrderID} />

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded-lg text-gray-900 hover:bg-gray-100"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {/* Display page buttons dynamically */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`h-8 w-8 border rounded-lg text-gray-900 hover:bg-gray-100 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 border rounded-lg text-gray-900 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;