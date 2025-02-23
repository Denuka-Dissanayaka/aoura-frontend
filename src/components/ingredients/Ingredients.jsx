import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

//import ViewSupplier from "../viewSupplier/ViewSupplier";
import AddIngredientForm from "../addIngredientForm/AddIngredientForm";
import ViewIngredient from "../viewingredient/ViewIngredient";

function Ingredients() {
  const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [editSupplierId, setEditSupplierId] = useState(null);
  const [viewIngredientId, setViewIngredientId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const [page, setPage] = useState(0);

  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getIngredients();
  }, [page]);

  useEffect(() => {
    getIngredients();
  }, [openEditModal]);

  const getIngredients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/ingredients?page=${page}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setIngredients(response.data.response);
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

  const deleteSupplier = async (id) => {
    try {
      const result = await axios.delete(`${api_url}/api/v1/staffs/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      toast.success(result.data.msg);
      //getSuppliers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Ingredients</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Ingredient
        </button>
      </div>

      <AddIngredientForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getIngredientFunc={getIngredients}
      />

      <ViewIngredient
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewIngredientId={viewIngredientId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Status</th>

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
              ingredients.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-4 text-center">#{item.id}</td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.status}</td>

                  <td className="text-center">
                    <button
                      onClick={() => {
                        setOpenViewModal(true);
                        setViewIngredientId(user.uuid);
                      }}
                      className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        //setOpenEditModal(true);
                        //setEditSupplierId(user.uuid);
                      }}
                      className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        //deleteSupplier(user.uuid);
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
        <p className="text-right mt-1 mb-1">
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
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

export default Ingredients;
