import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const TransporterPage = () => {
    return (
        <>
            <Header user={'transporter'} />
            <Outlet />
        </>
    )
}

export default TransporterPage