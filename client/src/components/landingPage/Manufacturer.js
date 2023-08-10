import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../Axios/axios";
import { orderListManufacturer } from "../../utils/redux/orderSlice";

const Manufacturer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([ ]);
  const [data, setData] = useState([]);

  const isLoggedIn = useSelector(store => store.manufacturer.isLoggedIn)
  const user = useSelector(store => store.manufacturer.user)
  const dispatch = useDispatch()
  const navigate= useNavigate()

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/')
    }
    const token = localStorage.getItem('manufacturer')

    getOrderDetails(token)
  },[])

  const getOrderDetails =  (token) => {
      instance.get('/orderDetails', {
       
        headers: {
          Authorization: `Bearer ${token}`
        },
        params : user
      }).then((res) => {
        if(res.data){
        setData(res?.data)
        setFilteredData(res?.data)
          dispatch(orderListManufacturer(res.data)) 
        }
        
      }).catch(err => {
      })
  }

  const handleSearch = () => {
    const searchResult = data.filter((item) =>
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(searchResult);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">ORDERS</h1>

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
          onClick={() => setSearchQuery("")}
        >
          Search
        </button>
      </div>

      <div>
        <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
          <Link to={"/manufacturer/transport"}>Transport an Item</Link>
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tranporter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData?.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap"><Link to={`/manufacturer/orderDetails/${item.orderDetails.orderId}`}>{item.orderDetails.orderId}</Link></td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.recipient.fullName}
              </td>
              <td className="px-6 py-4 flex flex-wrap whitespace-nowrap">
                <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                  <Link to={`/manufacturer/reply/${item.orderDetails.orderId}`}>Send message</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manufacturer;
