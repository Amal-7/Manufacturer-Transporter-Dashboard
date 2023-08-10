import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as transporterLogout } from "../utils/redux/transporterSlice.js";
import { logout as manufacturerLogout } from "../utils/redux/manufacturerSlice.js";
import { useNavigate } from "react-router-dom";
import { deleteOrdersManufacturer, deleteOrdersTransporter } from "../utils/redux/orderSlice.js";

const Header = ({user}) => {



 const isLoggedIn  =  useSelector(store =>
                    user==='manufacturer'?  
                    store.manufacturer.isLoggedIn :
                    store.transporter.isLoggedIn )

    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (user === "manufacturer") {
      dispatch(deleteOrdersManufacturer())
      dispatch(manufacturerLogout());
      localStorage.removeItem("manufacturer");
    } else {
      dispatch(deleteOrdersTransporter())
      dispatch(transporterLogout());
      localStorage.removeItem("transporter");
    }
    navigate("/");
  };

  

  return (

    <div className="flex  items-center shadow-lg min-h-[6rem] w-full">
      <div className="w-full flex justify-around">
        <h1 className="text-3xl font-bold">
          {isLoggedIn && user==='manufacturer' ? " Manufacturer" : ""}
          {isLoggedIn && user==='transporter' ? "Transporter" : ""}
          {!isLoggedIn && "WELCOME"}
        </h1>
      </div>
      <div className="">
        {isLoggedIn && (
          <button
            onClick={() => handleLogout()}
            className="flex justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2"
          >
            Logout-{user}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
