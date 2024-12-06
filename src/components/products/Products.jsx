import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

import EditProductForm from "../editProductForm/EditProductForm";
import AddProductForm from "../addProductForm/AddProductForm";
import ViewProduct from "../viewProduct/ViewProduct";

function Products() {
  const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [viewProductId, setViewProductId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [network, setNetwork] = useState("");
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchByName, setSearchByName] = useState("");
  const [page, setPage] = useState(0);
  const [pageWhenNetworkSelected, setPageWhenNetworkSelected] = useState(0);
  const [limit, setLimit] = useState(3);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    getProducts();
  }, [openEditModal]);

  useEffect(() => {
    setPageWhenNetworkSelected(0);
    setPage(0);
    setPages(0);
    setRows(0);

    network !== "" || searchByName !== ""
      ? getProductsBasedOnNetwork()
      : getProducts();
  }, [network, searchByName]);

  useEffect(() => {
    getProductsBasedOnNetwork();
  }, [pageWhenNetworkSelected]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/products?page=${page}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setProducts(response.data.response);
      setPage(response.data.page);
      setLimit(response.data.limit);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const getNetworks = async () => {
    try {
      const response = await axios.get(`${api_url}/api/v1/networks`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setNetworks(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  // get products based on network
  const getProductsBasedOnNetwork = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/products/base-on-network2?networkId=${network}&page=${pageWhenNetworkSelected}&limit=${limit}&search_by_name=${searchByName}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setProducts(response.data.response);
      setPageWhenNetworkSelected(response.data.page);
      setLimit(response.data.limit);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await axios.delete(`${api_url}/api/v1/products/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      toast.success(result.data.msg);
      //console.log(result);
      getProducts();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    network !== "" || searchByName !== ""
      ? setPageWhenNetworkSelected(selected)
      : setPage(selected);
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Products and Packages</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Product or Package
        </button>

        <div className="grid gap-4 mb-4 grid-cols-4 mt-4">
          {user && user.role === "admin" && (
            <div className="col-span-1 ">
              <select
                id="productType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                }}
              >
                <option selected value={""}>
                  Search By Network
                </option>

                {networks.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="col-span-1 ">
            <input
              type="text"
              name="earchByName"
              value={searchByName}
              onChange={(e) => {
                setSearchByName(e.target.value);
              }}
              id="earchByName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search By Name"
            />
          </div>
        </div>
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

      <ViewProduct
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewProductId={viewProductId}
        id={id}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              {/* <th>Product ID</th> */}
              <th>Product Name</th>
              <th>Price</th>
              {/* <th>Quantity</th> */}
              {user && user.role === "admin" ? (
                <th>Network Name</th>
              ) : (
                <th>User Name</th>
              )}
              <th>Type</th>
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
                    <td className="p-4 text-center">#{product.id}</td>
                    {/* <td className="text-center">{product.uuid}</td> */}
                    <td className="text-center">{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    {/* <td className="text-center">{product.quantity}</td> */}
                    {user && user.role === "admin" ? (
                      <td className="text-center">{product.network.name}</td>
                    ) : (
                      <td className="text-center">{`${product.user.fristname} ${product.user.lastname}`}</td>
                    )}
                    <td className="text-center">{product.type}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenViewModal(true);
                          setViewProductId(product.uuid);
                          setId(index + 1);
                        }}
                        className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </button>
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
        <nav className="flex items-center gap-4 mt-6 justify-center">
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={"flex items-center gap-4"}
            pageClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            activeClassName={
              "bg-gray-500 dark:bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            previousClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            nextClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            disabledLinkClassName={" text-gray-400 dark:text-gray-700"}
          />
        </nav>
      </div>
    </div>
  );
}

export default Products;
