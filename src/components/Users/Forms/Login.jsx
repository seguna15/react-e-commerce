import React, { useState } from "react";
import highHeel from '../../../assets/high-heels-2184095_1280.webp'
import {useDispatch, useSelector} from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../shared/components/LoadingComponent";

const Login = () => {
  //dispatch

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  //---Destructuring---
  const { email, password } = formData;
  
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    dispatch(loginUserAction({email, password}))
  };

  //get data from store
  const {error, loading, userInfo} = useSelector((state) => state?.users?.userAuth);
  
  //redirect
  if(userInfo?.userData?.isAdmin){
    return window.location.href = "/admin"
  }
  
  if(userInfo?.userData?.isAdmin === false) {
    return window.location.href = "/customer";
  }


  return (
    <>
      <section className="py-20 overflow-x-hidden bg-gray-100">
        <div className="container relative px-4 mx-auto">
          <div className="absolute inset-0 my-24 -ml-4 bg-blue-200" />
          <div className="relative flex flex-wrap bg-white">
            <div className="w-full px-4 md:w-4/6">
              <div className="px-4 py-20 mx-auto lg:max-w-3xl md:px-10 lg:px-20">
                <h3 className="mb-8 text-4xl font-bold md:text-5xl font-heading">
                  Login to your account
                </h3>
                <p className="mb-10 font-semibold font-heading">
                  Happy to see you again
                </p>
                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}
                >
                  <div className="w-full px-4 mb-8 md:w-1/2 md:mb-12">
                    <label>
                      <h4 className="mb-5 font-bold text-gray-400 uppercase font-heading">
                        Your Email
                      </h4>
                      <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="w-full p-5 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="w-full px-4 mb-12 md:w-1/2">
                    <label>
                      <h4 className="mb-5 font-bold text-gray-400 uppercase font-heading">
                        Password
                      </h4>
                      <input
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="w-full p-5 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                        type="password"
                      />
                    </label>
                  </div>

                  <div className="w-full px-4">
                    {loading ? (
                      <LoadingComponent/>
                    ) : (
                      <button className="px-8 py-5 font-bold text-white uppercase bg-blue-800 rounded-md hover:bg-blue-900 font-heading">
                        Login
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div
              className="flex items-center w-full px-4 pb-20 bg-no-repeat bg-cover md:w-2/6 h-128 md:h-auto lg:items-end"
              style={{
                backgroundImage: `url(${highHeel})`,
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
