import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";

const Alluser = () => {
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserService.getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeRole = (email) => {
    UserService.getRoleByEmail(email).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserService.makeUser(email).then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.email === email ? { ...user, role: "user" } : user
            )
          );
        });
      } else {
        UserService.makeAdmin(email).then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.email === email ? { ...user, role: "admin" } : user
            )
          );
        });
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c1121f",
        cancelButtonColor: "#e5e5e5",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await UserService.deleteUser(id);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              timer: 1500,
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="w-screen max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>_id</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td className="flex m-2">
                  <p>User</p>
                  <input
                    type="checkbox"
                    className="toggle toggle-error mr-2 ml-2"
                    onClick={() => handleChangeRole(user.email)}
                    checked={user.role === "admin"}
                  />
                  <p>Admin</p>
                </td>
                <td>{user._id}</td>
                <td>
                  <button className="btn btn-sm btn-error text-white" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>_id</th>
              <th>#</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(users.length / itemsPerPage),
        }).map((_, index) => (
          <button
            onClick={() => paginate(index + 1)}
            key={index}
            className={`mx-1 btn btn-ghost ${
              currentPage === index + 1 ? "bg-[#d6ccc2] text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Alluser;