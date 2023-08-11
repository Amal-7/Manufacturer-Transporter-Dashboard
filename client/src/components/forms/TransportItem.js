import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validate } from "../../utils/validation/transportItemValidation";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import instance from "../../Axios/axios";
import { useNavigate } from "react-router-dom";

const socketConnection = socketIOClient("http://localhost:3000");

const TranportItem = () => {
  const [socket, setSocket] = useState(null);
  const [transporters, setTransporters] = useState([]);
  const user = useSelector((store) => store.manufacturer.user);
  const isLoggedIn = useSelector((store) => store.manufacturer.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/manufacturer");
    }
    const token = localStorage.getItem("manufacturer");

    setSocket(socketConnection);

    getTransporters(token);

    return () => {
      socket?.disconnect();
    };
  }, []);

  const getTransporters = (token) => {
    instance
      .get("/manufacturer/getTransporters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransporters(res.data);
      });
  };

  const id = Date.now().toString();

  const formik = useFormik({
    initialValues: {
      orderId: id,
      date: "",
      from: "",
      to: "",
      quantity: "",
      pickup: user?.address,
      transporter: {},
    },
    validate,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      if (socket) {
        const transporterDetails = transporters.filter(
          (transporter) => transporter._id == values.transporter
        );
        const message = {
          orderDetails: values,
          selectedTransporterId: values.transporter,
          sender: user,
          recipient: transporterDetails[0],
        };

        try {
          socket?.emit('registerManufacturer',user._id)
          socket?.emit("submit order", {
            message,
          });

          await new Promise((resolve) => {
            socket.once("order processed", () => {
              resolve();
            });
          });
          navigate("/manufacturer");
        } catch (error) {
          console.log("error sending order", error);
        }
      }
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          TRANSPORT ITEM
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Order ID
              </label>
              <div className="mt-2 mb-3">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="orderId"
                  name="orderId"
                  type="text"
                  value={formik.values.orderId}
                  placeholder={formik.values.orderId}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                From
              </label>
              <div className="mt-2 mb-3">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="from"
                  name="from"
                  type="from"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.from}
                />
                {formik.touched.from && formik.errors.from ? (
                  <div className="text-red-400">{formik.errors.from}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="to"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To
              </label>
              <div className="mt-2 ">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  name="to"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.touched.to && formik.errors.to ? (
              <div className="text-red-400">{formik.errors.to}</div>
            ) : null}

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Quantity
              </label>
              <div className="mt-2 ">
                <select
                  id="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className=" border rounded px-2 py-1"
                >
                  <option value="">Select...</option>
                  <option value="1 ton">1 ton</option>
                  <option value="2 ton">2 ton</option>
                  <option value="3 ton">3 ton</option>
                </select>
              </div>
            </div>

            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-400">{formik.errors.quantity}</div>
            ) : null}

            <div>
              <label
                htmlFor="pickup"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pickup
              </label>
              <div className="mt-2 mb-4">
                <input
                  id="pickup"
                  name="pickup"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pickup}
                  placeholder={formik.values.pickup}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.pickup && formik.errors.pickup ? (
                  <div className="text-red-400">{formik.errors.pickup}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Transporters
              </label>
              <div className="mt-2 ">
                <select
                  id="transporter"
                  value={formik.values.transporter}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className=" border rounded px-2 py-1"
                >
                  <option value="">Select...</option>
                  {transporters.map((transporter) => (
                    <option key={transporter._id} value={transporter._id}>
                      {transporter.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {formik.touched.transporter && formik.errors.transporter ? (
              <div className="text-red-400">{formik.errors.transporter}</div>
            ) : null}

            {/* <div>
                <label
                  htmlFor="transporter"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Transporter
                </label>
              
              <div className="mt-2 mb-4">
                <input
                  id="transporter"
                  name="transporter"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.transporter}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
               
              </div>
            </div> */}

            <div>
              <button className="flex w-full justify-center rounded-md mt-3  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Transport
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TranportItem;
