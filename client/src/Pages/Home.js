import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header.js"


const Home = () => {
    const navigate = useNavigate()
    const isManufacturerLoggedIn = useSelector(store => store.manufacturer.isLoggedIn)
    const isTransporterLoggedIn = useSelector(store => store.transporter.isLoggedIn)
    useEffect(()=> {
        if (isManufacturerLoggedIn) {
            navigate("/manufacturer");
          } else if (isTransporterLoggedIn) {
            navigate("/transporter");
          }
    
    },[isManufacturerLoggedIn,isTransporterLoggedIn])
   
      
    return (
        <>
        <Header />
        
        <div className="flex flex-col justify-center items-center min-h-screen ">
            <div className=" flex w-[80%] justify-center">
            <Link className="" to={'/manufacturer/login'}> <button className="flex justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2">Manufacturer Login</button></Link>
            <Link className=" " to={'/transporter/login'}> <button className="flex justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2">Transporter Login</button></Link>
      
            </div>
            <div className="flex items-center mt-10">
            <span>Don't have an account?</span>
            <Link className="text-blue-700" to={"/signup"}>
            <button className="flex justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2">click here</button>
                
            </Link>
            </div>
           
              </div>
              </>
    )
}


export default Home