import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import highHeel from "../../../assets/high-heels-2184095_1280.webp";

const RegisterForm = () => {
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  //---Destructuring---
  const { fullname, email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({fullname, email, password}))
  };
  //select store data

  //select store data
  const { loading, user } = useSelector((state) => state?.users);

  //redirect
  useEffect(()=> {
    if (user) {
      window.location.href = "/login";
    }
  },[user])
 
  return (
    <>
      <section className="relative overflow-x-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 mb-12 lg:w-2/6 lg:mb-0">
              <div className="py-20 text-center">
                <h3 className="mb-8 text-4xl font-bold md:text-5xl font-heading">
                  Signing up with social is super quick
                </h3>

                <p className="mb-10">Please, do not hesitate</p>
                <form onSubmit={onSubmitHandler}>
                  <input
                    name="fullname"
                    value={fullname}
                    onChange={onChangeHandler}
                    className="w-full px-12 py-6 mb-4 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                    type="text"
                    placeholder="Full Name"
                  />
                  <input
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    className="w-full px-12 py-6 mb-4 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <input
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    className="w-full px-12 py-6 mb-4 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button className="px-8 py-5 mt-12 font-bold text-white uppercase bg-blue-800 rounded-md md:mt-16 hover:bg-blue-900 font-heading">
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-0 bottom-0 right-0 hidden bg-center bg-no-repeat bg-cover lg:block lg:absolute lg:w-3/6"
          style={{
            backgroundImage:
              `url(${highHeel})`,
          }}
        />
      </section>
    </>
  );
};

export default RegisterForm;
