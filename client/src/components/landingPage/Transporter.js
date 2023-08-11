import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import instance from "../../Axios/axios";
import { orderListTransporter } from "../../utils/redux/orderSlice";

const Transporter = () => {
  const [socket, setSocket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [data, setData] = useState();

  const isLoggedIn = useSelector((store) => store.transporter.isLoggedIn);
  const user = useSelector((store) => store.transporter.user);
  const orderStore = useSelector(store => store.orders.transporter)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    const token = localStorage.getItem('transporter')

    getOrderDetails(token)
    const socketConnection = socketIOClient("http://localhost:3000");
    setSocket(socketConnection);

    return () => {
      socket?.disconnect();
    };
  }, []);

  const getOrderDetails =  (token) => {
    instance.get('/orderDetails/transporter', {
     
      headers: {
        Authorization: `Bearer ${token}`
      },
      params : user
    }).then((res) => {
      if(res.data){
      setData(res.data)
      setFilteredData(res.data)        
     dispatch(orderListTransporter(res?.data))
      }
    }).catch(err => {
    })
  }

  useEffect(() => {
    socket?.emit("registerTransporter", user._id);
    socket?.on("newOrder", (order) => {
      setData((prevMsg) => [
        ...prevMsg,
        order.message
      ]);
      setFilteredData((prevMsg) => [
        ...prevMsg,
        order.message
      ])
      
      
      dispatch(orderListTransporter([...orderStore,order.message]))
    });
  }, [socket]);

 

  const handleSearch = () => {
    const searchResult = data.filter((item) =>{
    if (
      item?.orderDetails?.orderId.includes(searchQuery) ||
      item?.orderDetails?.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.orderDetails?.from.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return item;
    }

  });

    setFilteredData(searchResult);
    setSearchQuery('')
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">ORDERS </h1>

      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-l-lg focus:outline-none focus:shadow-outline-blue"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manufacturer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData?.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap"><Link className="text-blue-500" to={`/transporter/orderDetails/${item.orderDetails.orderId}`}>{item.orderDetails.orderId}</Link></td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.sender.fullName}
              </td>
              <td className="px-6 py-4 flex flex-wrap whitespace-nowrap">
                <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                  <Link to={`/transporter/reply/${item.orderDetails.orderId}`}>Send Message </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transporter;
