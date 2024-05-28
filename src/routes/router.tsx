import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute, { AdminProtectedRoute, DoctorProtectedRoute } from "./ProtectedRoute";
// import PublicRoute from './PublicRoue'
import { DoctorPublicRoute, PublicRoute } from "./PublicRoue";


const Register = lazy (()=>import('../pages/user/Register'))
const Login = lazy (()=>import('../pages/user/Login'))
const VerifyOtp = lazy(()=>import("../pages/user/VerifyOTP"));
const Home = lazy(() => import("../pages/Home"));
const ForgotPassword = lazy(()=>import('../pages/user/ForgotPassword'))
const ResetPassword = lazy(()=>import('../pages/user/ResetPassword'))
const DoctorList = lazy(()=>import("../pages/user/DoctorPage"));
const ProfileUser = lazy(()=>import("../pages/user/Profile"));

const AboutPage = lazy (()=> import('../pages/user/AboutPage'))
const ContactPage = lazy (()=> import('../pages/user/ContactPage'))
const DoctorhomePage = lazy(()=>import("../pages/doctor/doctorDashbord"))
const DoctorSignup = lazy(()=>import("../pages/doctor/doctorSignup"))
const DoctorLogin = lazy(()=>import("../pages/doctor/doctorLogin"))
const EmailVerificationPage = lazy(() => import("../pages/doctor/emailVerification")); 
const ProfileDoctor = lazy(()=>import("../pages/doctor/Profile"));

const AdminLogin = lazy(()=> import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(()=>import ("../pages/admin/AdminDashboard"));
const AdminUserList = lazy(()=>import ("../pages/admin/UserList"));

const AdminDoctorList = lazy(()=>import ("../pages/admin/DoctorList"));
const RequestedDoctors = lazy(()=>import("../pages/admin/ReqDoctorList"))

const AdminDoctorDetails = lazy(()=>import ("../pages/admin/doctorDetails"));
const AdminDepartmentList = lazy(()=>import ("../pages/admin/DepartmentList"));
const AddDepartmentList = lazy(()=>import ("../pages/admin/AddDepartmentPage"));








export const MainRouter = () => {
    return (
        <>
        <Suspense fallback ={<h1>Loading</h1>}>
            <Routes>
            {/* public routes for user */}
            <Route path="/" element={<Home />} />
            <Route path="/user/aboutus" element={<AboutPage />} />
            <Route path="/user/contact" element={<ContactPage />} />
            {/* <Route path="/user/doctor" element={<DoctorList />} /> */}

            <Route path="" element={<PublicRoute />}>
                <Route path="/user/register" element={<Register />} />
                <Route path ="/user/verify_otp" element={<VerifyOtp/>}/>
                <Route path="/user/login" element={<Login/>}/>
                <Route path ='/user/forgot_password' element ={<ForgotPassword/>}/>
                <Route path ='/user/reset_password/:id' element ={<ResetPassword/>}/>
            </Route>

            {/* private routes for user */}
            <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/doctor" element={<DoctorList />} />
            <Route path="/user/Profile" element={<ProfileUser />} />
            </Route>




            <Route path="/doctor" element={<DoctorhomePage/>}/>
             {/*Doctor Routes - public*/ }
            <Route path="" element={<DoctorPublicRoute />}>
            <Route path="/doctor" element={<DoctorhomePage/>}/>
            <Route path="/doctor/register" element={<DoctorSignup/>}/>
            <Route path="/doctor/verify-token/:token" element ={<EmailVerificationPage/>}/>
            <Route path="/doctor/login" element={<DoctorLogin/>}/>
            </Route>
            {/*Doctor Routes - private*/ }
            <Route path="" element={<DoctorProtectedRoute />}>
            <Route path="/doctor" element={<DoctorhomePage/>}/>
            <Route path="/doctor/profile" element ={<ProfileDoctor/>}/>
            </Route>




            {/******************* Admin routes *****************/}
            <Route path="" element={<PublicRoute />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            </Route>
             {/* admin protected Route  */}
            <Route path="" element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/admin/users" element={<AdminUserList/>}/>
            <Route path="/admin/doctors" element={<AdminDoctorList/>}/>
            <Route path="/admin/doctors/:id" element={<AdminDoctorDetails/>}/>
            <Route path="/admin/requesteddoctors" element={<RequestedDoctors/>}/>
            <Route path="/admin/department" element ={<AdminDepartmentList/>}/>
            <Route path="/admin/addDepartment" element ={<AddDepartmentList/>}/>

            </Route>
           
            </Routes>   
        </Suspense>
        </>
    )
}