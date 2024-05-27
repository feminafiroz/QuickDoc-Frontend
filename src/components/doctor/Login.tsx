import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { validateLogin } from "../../utils/validation";
import { DOCTOR_API } from "../../constants";
import showToast from "../../utils/toaster";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { jwtDecode } from "jwt-decode";
import Logo1 from '../../assets/images/quickdoc.png';
import { GoogleLogin } from "@react-oauth/google";
import { setDoctor , setTokens} from '../../redux/slices/DoctorSlice';
import { setItemToLocalStorage } from '../../utils/setnget';



const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(DOCTOR_API + "/login", { email, password })
        .then(({ data }) => {
          // const access_token = data.accessToken
          const { doctorName:name, role, _id } = data.doctor;
          const { message, access_token, refresh_token } = data;
          console.log(data,"qwertyuiopasdfghjklzxcvbnm")
          dispatch(setDoctor({ isAuthenticated: true, name, role,id:_id }));
          setItemToLocalStorage('access_token', access_token); 
          setItemToLocalStorage("refresh_token",refresh_token)
          showToast(message, "success");
          // dispatch(setTokens({ access_token, refresh_token }));
          setTimeout(() => {
            navigate("/doctor");
          }, 1000);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          setIsSubmitting(false);
          showToast(message, "error");
        });
    },
  });

  const handleGooglSignIn = (doctor: {
    doctorName: string;
    email: string;
    picture: string;
    email_verified: boolean;
  }) => {
    axios
      .post(DOCTOR_API + "/google_signIn", { doctor })
      .then(({ data }) => {
        const { message, user,access_token, refresh_token } = data;
        // localStorage.setItem('access_token', accessToken);
        setItemToLocalStorage('access_token', access_token); 
        setItemToLocalStorage("refresh_token",refresh_token)
        showToast(message, "success");
         console.log(doctor)
        dispatch(setDoctor({ isAuthenticated: true, name: user.doctorName, role: user.role }));
        // dispatch(setTokens({ access_token, refresh_token }));
        navigate("/doctor");
      })
      .catch(({ response }) => showToast(response.data.message, "error"));
  };


  return (
    <section className="flex flex-col md:flex-row h-screen items-center ">
    <div className="relative flex-shrink-0 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    <div className="absolute inset-0 bg-green-700 opacity-25"></div>
      <h1 className="absolute top-24 left-8 font-semibold text-4xl text-white leading-snug"> 
      Streamline Your Schedule,
        <br/>Empower Your Practice!<br/>
      Be a part of <br/>
      <img src={Logo1} alt="Quick Doc Logo" className="h-14 mr-2 inline-block" />
      
       <span className = "text-5xl">QuickDoc Community</span>
      </h1>
      <img
        src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=996&t=st=1715342351~exp=1715342951~hmac=11a1addf8cb3e4f814b2a3126db4d78e6f610b4135a9912e683615ec1f2d6f54"
        alt="Restaurant table image"
        className="w-full h-full object-cover"
      />
       
    </div>
    <div className="bg-white mb-20 w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center ">
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
          Loginn
        </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none"
                autoFocus
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full block  bg-green-700 hover:bg-green-600 transition duration-300 focus:bg-green-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSubmitting}
            >
              LogIn
            </button>
            <p className="mt-8">
            Don,t have an account?
            <Link to="/doctor/register" className="text-blue-500 hover:text-blue-700 font-semibold">
              Create Account
            </Link>
            </p>
          </form>

          <div className="px-4 py-2 w-full  flex justify-center gap-2 ">
              <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                  const data: {
                    doctorName: string;
                    email: string;
                    picture: string;
                    email_verified: boolean;
                  } = jwtDecode(credentialResponse?.credential);
                  handleGooglSignIn(data);
                }}
                onError={() => {
                  showToast("Login Failed", "error");
                }}
              />
            </div>


        </div>
      </div>
    </section>
  );
};

export default Login;