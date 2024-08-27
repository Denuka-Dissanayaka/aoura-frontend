import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import AdduserForm from "../addUserForm/AdduserForm";
import AddStaffForm from "../addStaffForm/AddStaffForm";

const recentOrderData = [
  {
    id: "1",
    product_id: "Denuka",
    customer_id: "23143",
    customer_name: "Dissanayaka",
    order_date: "denuka123",
    order_total: "$435.50",
    current_order_status: "PLACED",
    shipment_address: "Cottage Grove, OR 97424",
  },
  {
    id: "7",
    product_id: "Kasun",
    customer_id: "96453",
    customer_name: "Madushanka",
    order_date: "kasun_m",
    order_total: "$96.35",
    current_order_status: "CONFIRMED",
    shipment_address: "Los Angeles, CA 90017",
  },
  {
    id: "2",
    product_id: "Achala",
    customer_id: "65345",
    customer_name: "Mason Nash",
    order_date: "Mash12",
    order_total: "$836.44",
    current_order_status: "SHIPPED",
    shipment_address: "Westminster, CA 92683",
  },
  {
    id: "3",
    product_id: "Amila",
    customer_id: "87832",
    customer_name: "Gunawardana",
    order_date: "amil1234",
    order_total: "$334.50",
    current_order_status: "SHIPPED",
    shipment_address: "San Mateo, CA 94403",
  },
  {
    id: "4",
    product_id: "Pasidu",
    customer_id: "09832",
    customer_name: "Lakshan",
    order_date: "pasinu34",
    order_total: "$876.00",
    current_order_status: "OUT_FOR_DELIVERY",
    shipment_address: "San Mateo, CA 94403",
  },
  {
    id: "5",
    product_id: "Ranga",
    customer_id: "97632",
    customer_name: "Kodithuwakku",
    order_date: "kodi20",
    order_total: "$96.35",
    current_order_status: "DELIVERED",
    shipment_address: "Los Angeles, CA 90017",
  },
];

function Staff() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://aoura-backend-production.up.railway.app/api/v1/staffs",
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setLoading(false);
    setUsers(response.data);
  };

  const deleteStaff = async (id) => {
    await axios.delete(
      `https://aoura-backend-production.up.railway.app/api/v1/staffs/${id}`,
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    getStaffs();
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Staff Members</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Member
        </button>
      </div>

      {/* -------------------- */}

      <AddStaffForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getStaffsFunc={getStaffs}
      />

      {/* ----------------------- */}

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>User ID</th>
              <th>Frist Name</th>
              <th>Last Name</th>
              <th>NIC</th>
              <th>Network Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex justify-center mt-2 w-full">
                <Blocks
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  visible={true}
                />
              </div>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="text-center">{user.uuid}</td>
                  <td className="text-center">{user.fristname}</td>
                  <td className="text-center">{user.lastname}</td>
                  <td className="text-center">{user.nic}</td>
                  <td className="text-center">{user.network.name}</td>
                  <td className="text-center">
                    <button className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteStaff(user.uuid);
                      }}
                      className="bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
