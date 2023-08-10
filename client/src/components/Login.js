import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../utils/validation/loginValidation";
import instance from "../Axios/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login as transporterLogin}  from '../utils/redux/transporterSlice.js';
import {login as manufacturerLogin} from '../utils/redux/manufacturerSlice.js'


const Login = ({user}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const isLoggedIn = useSelector(store => 
                      user==='manufacturer'?
                      store.manufacturer.isLoggedIn :
                      store.transporter.isLoggedIn )

useEffect(() => {
  isLoggedIn? navigate(`/${user}`) : ''

},[isLoggedIn])



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      
     
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      instance.post(`/${user}/login`,values).then((res) => {
        if(res.data?.status) {
          user==='transporter' ? dispatch(transporterLogin(res.data.user)) : dispatch(manufacturerLogin(res.data.user))
          localStorage.setItem(user,res.data.token)

          navigate(`/${user}`)
        }
    })
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login 
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <form onSubmit={formik.handleSubmit}>
           
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 mb-3">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-400">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 mb-4">
                <input
                  id="password"
                  name="password"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md mb-2  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
