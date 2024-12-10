import { useEffect, useState } from "react";
import Card from "../cards/Card";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { dataLine, dataBar } from "../../assets/chartData";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const api_url = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.auth);

  const [networks, setNetworks] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [staffsCount, setStaffsCount] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [networkNames, setNetworkNames] = useState([]);
  const [customersCount, setCustomersCount] = useState([]);
  const [ordersCountBaseOnNetwork, setOrdersCountBaseOnNetwork] = useState([]);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [completeOrderCount, setCompleteOrderCount] = useState(0);
  const [network, setNetwork] = useState("");

  useEffect(() => {
    // if (user && user.role === "user") {
    //   setNetwork(user.networkId);
    // }
    getOrdersStatusCount("pending", setPendingOrderCount);
    getOrdersStatusCount("complete", setCompleteOrderCount);
  }, [user]);

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
        console.log(error.response.data.msg);
      }
    }
  };

  const getProductsCount = async () => {
    try {
      const response = await axios.get(`${api_url}/api/v1/products/count`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setProductsCount(response.data.response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getOrdersCount = async () => {
    try {
      const response = await axios.get(`${api_url}/api/v1/orders/count`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setOrdersCount(response.data.response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  // get status count
  const getOrdersStatusCount = async (status, setCount) => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/orders/status-count?status=${status}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setCount(response.data.count);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  //orders Count Base On Network
  const getOrdersCountBaseOnNetwork = async (network) => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/orders/orders-count-basedon-network?networkId=${network.id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setOrdersCountBaseOnNetwork((prev) => [...prev, response.data.count]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getStaffsCount = async () => {
    try {
      const response = await axios.get(`${api_url}/api/v1/staffs/count`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setStaffsCount(response.data.response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${api_url}/api/v1/customers/count`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setCustomers(response.data.response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  console.log(networks);
  console.log(customersCount);

  const cbForGetCustomersCounts = async (network) => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/customers/base-on-network/${network.id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      const length = response.data.length;
      setCustomersCount((prev) => [...prev, length]);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.msg);
      }
    }
  };

  const getCustomersCounts = () => {
    networks.forEach(cbForGetCustomersCounts);
  };

  useEffect(() => {
    getNetworks();
    getCustomers();
    getStaffsCount();
    getOrdersCount();
    getProductsCount();
  }, []);

  useEffect(() => {
    setNetworkNames([]);
    setCustomersCount([]);
    networks.forEach((item) => {
      setNetworkNames((prev) => [...prev, item.name]);
      cbForGetCustomersCounts(item);
      getOrdersCountBaseOnNetwork(item);
    });
    //getCustomersCounts();
  }, [networks]);

  //console.log(networkNames);
  //console.log(customersCount);
  console.log(ordersCountBaseOnNetwork);

  const dataBar1 = {
    labels: [...networkNames],
    datasets: [
      {
        label: "Quantity",
        data: [...customersCount],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataLine1 = {
    labels: [...networkNames],
    datasets: [
      {
        label: "Sales",
        data: [...customersCount],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const dataPie = {
    labels: ["Pending", "Complete"],
    datasets: [
      {
        label: "# ",
        data: [pendingOrderCount, completeOrderCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaShoppingCart />} title="Orders" value={ordersCount} />
        <Card icon={<AiFillProduct />} title="Products" value={productsCount} />
        <Card icon={<FaUser />} title="Customers" value={customers} />
        {user?.role === "admin" && (
          <Card icon={<FaUserTie />} title="Staffs" value={staffsCount} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {user?.role === "admin" && (
          <>
            <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Orders Count</h3>
              <Line data={dataLine1} />
            </div>
            <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Customers Data</h3>
              <Bar data={dataBar1} />
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Orders Data</h3>
          <Pie data={dataPie} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// function Dashboard() {
//   return (
//     <div className="grow p-8">
//       <h2 className="text-2xl mb-4">Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <Card icon={<FaShoppingCart />} title="Orders" value="140" />
//         <Card icon={<AiFillProduct />} title="Products" value="120" />
//         <Card icon={<FaUser />} title="Customers" value="30" />
//         <Card icon={<FaUserTie />} title="Staffs" value="30" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
//           <Line data={dataLine} />
//         </div>
//         <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Products Data</h3>
//           <Bar data={dataBar} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
