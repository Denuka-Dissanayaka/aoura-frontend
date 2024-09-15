import { useEffect, useState } from "react";
import Card from "../cards/Card";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { dataLine, dataBar } from "../../assets/chartData";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function Dashboard() {
  //const api_url = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.auth);

  const [networks, setNetworks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [networkNames, setNetworkNames] = useState([]);
  const [customersCount, setCustomersCount] = useState([]);

  const getNetworks = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/networks`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setNetworks(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/products`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/orders`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setOrders(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getStaffs = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/staffs`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setStaffs(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/customers`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setCustomers(response.data);
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
        `https://aoura-backend-production.up.railway.app/api/v1/customers/base-on-network/${network.id}`,
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
    getNetworks();
    getOrders();
    getProducts();
  }, []);

  useEffect(() => {
    setNetworkNames([]);
    setCustomersCount([]);
    networks.forEach((item) => {
      setNetworkNames((prev) => [...prev, item.name]);
    });
    getCustomersCounts();
  }, [networks]);

  console.log(networkNames);

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

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaShoppingCart />} title="Orders" value={orders.length} />
        <Card
          icon={<AiFillProduct />}
          title="Products"
          value={products.length}
        />
        <Card icon={<FaUser />} title="Customers" value={customers.length} />
        <Card icon={<FaUserTie />} title="Staffs" value={staffs.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
          <Line data={dataLine} />
        </div>
        <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Customers Data</h3>
          <Bar data={dataBar1} />
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
