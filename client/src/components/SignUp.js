import { useFormik } from "formik";
import instance from "../Axios/axios";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validation/signupValidation";
import store from "../utils/redux/store.js";
import { login as transporterLogin } from "../utils/redux/transporterSlice.js";
import { login as manufacturerLogin } from "../utils/redux/manufacturerSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isManufacturerLoggedIn = useSelector(
    (store) => store.manufacturer.isLoggedIn
  );
  const isTransporterLoggedIn = useSelector(
    (store) => store.transporter.isLoggedIn
  );

  if (isManufacturerLoggedIn) {
    navigate("/manufacturer");
  } else if (isTransporterLoggedIn) {
    navigate("/transporter");
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      address: "",
      role: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const userRole = values.role;
      instance.post(userRole, values).then((res) => {
        if (res.data?.savedUser) {
          let userData = res.data.savedUser;

          // Redux
          userRole === "manufacturer"
            ? dispatch(manufacturerLogin(userData))
            : dispatch(transporterLogin(userData));
          localStorage.setItem(userRole, res.data.token);

          navigate(`/${userRole}`);
        }
      });
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2 mb-3">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-400">{formik.errors.fullName}</div>
                ) : null}
              </div>
            </div>
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
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2 flex">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-3  mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="manufacturer"
                    checked={formik.values.role === "manufacturer"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  Manufacturer
                </label>
                <label className="block text-sm font-medium leading-6 text-gray-900  mx-2">
                  <input
                    type="radio"
                    name="role"
                    value="transporter"
                    checked={formik.values.role === "transporter"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  Transporter
                </label>
              </div>
            </div>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-400">{formik.errors.role}</div>
            ) : null}

            {formik.values.role === "manufacturer" && (
              <div className="mt-2 ">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Address:
                  <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-400">{formik.errors.address}</div>
                ) : null}
              </div>
            )}

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
              <button className="flex w-full justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
