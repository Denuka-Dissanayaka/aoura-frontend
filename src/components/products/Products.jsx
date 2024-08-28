import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

import EditProductForm from "../editProductForm/EditProductForm";
import AddProductForm from "../addProductForm/AddProductForm";

const recentOrderData = [
  {
    id: "1",
    product_id: "1255",
    customer_id: "23143",
    customer_name: "Product 1",
    order_date: "$435.50",
    order_total: "355",
    current_order_status: "PLACED",
    shipment_address: "Cottage Grove, OR 97424",
  },
  {
    id: "7",
    product_id: "45322",
    customer_id: "96453",
    customer_name: "Product 2",
    order_date: "$96.35",
    order_total: "96",
    current_order_status: "CONFIRMED",
    shipment_address: "Los Angeles, CA 90017",
  },
  {
    id: "2",
    product_id: "34789",
    customer_id: "65345",
    customer_name: "Product 3",
    order_date: "$836.44",
    order_total: "36",
    current_order_status: "SHIPPED",
    shipment_address: "Westminster, CA 92683",
  },
  {
    id: "3",
    product_id: "09545",
    customer_id: "87832",
    customer_name: "Product 4",
    order_date: "$334.50",
    order_total: "50",
    current_order_status: "SHIPPED",
    shipment_address: "San Mateo, CA 94403",
  },
];

function Products() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [openEditModal]);

  const getProducts = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://aoura-backend-production.up.railway.app/api/v1/products",
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setLoading(false);
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    const result = await axios.delete(
      `https://aoura-backend-production.up.railway.app/api/v1/products/${id}`,
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    toast.success(result.data.msg);
    console.log(result);
    getProducts();
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Products</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Product
        </button>
      </div>

      {/* -------------------- */}
      <AddProductForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getProductsFunc={getProducts}
      />

      {/* ----------------------- */}

      <EditProductForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditProductId={setEditProductId}
        editProductId={editProductId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              {user && user.role === "admin" ? (
                <th>Network Name</th>
              ) : (
                <th>User Name</th>
              )}
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
              products.map((product, index) => (
                <>
                  <tr key={product.uuid}>
                    <td className="p-4 text-center">#{index + 1}</td>
                    <td className="text-center">{product.uuid}</td>
                    <td className="text-center">{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.quantity}</td>
                    {user && user.role === "admin" ? (
                      <td className="text-center">{product.network.name}</td>
                    ) : (
                      <td className="text-center">{`${product.user.fristname} ${product.user.lastname}`}</td>
                    )}
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditProductId(product.uuid);
                        }}
                        className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(product.uuid);
                        }}
                        className="bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
