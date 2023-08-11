import { Link, useRouteError } from "react-router-dom"
import Header from "../components/Header"


const Error = () => {


    const {status, statusText} = useRouteError()

    return (
        <>
        <div className="flex flex-col min-w-full justify-center items-center">

            <img className="max-w-sm" src="https://cdn-icons-png.flaticon.com/512/682/682010.png?w=740&t=st=1691742719~exp=1691743319~hmac=b2e7aab06ae9e4dfa9b85b578ab862cebb14dd9aad50d7e060a70051a2a8143e" alt="error_image" />
            <h1 className="font-bold text-2xl text-red-400">Oooopz!!</h1>
            <h2 className="font-bold text-xl text-red-400">Something Went wrong</h2>
            <h1 className="font-bold text-lg text-red-400">{status+" "+statusText}</h1>
            <Link className="text-lg text-blue-500" to={'/'} >Back To Page</Link>

        </div>
        </>
    )
}


export default Error