import { Outlet } from "react-router-dom"
import Header from "../components/Header"


const ManufacturerPage = () => {

    return (
        <>
            <Header  user={'manufacturer'} />
            <Outlet />
        </>
    )
}

export default ManufacturerPage


