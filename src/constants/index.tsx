export const nameRegex = /^[A-Z][a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const phoneRegex = /^\d{10}$/;
export const BASE_URL = "http://localhost:5000/api/";
export const USER_API = BASE_URL + "user";
export const DOCTOR_API = BASE_URL + "doctor";
export const ADMIN_API = BASE_URL + "admin";
export const TOKEN_API = BASE_URL + "token";
export const CLOUDINARY_UPLOAD_API =  "https://api.cloudinary.com/v1_1/dv8mymzxo/image/upload";
export const cloudinaryUploadPreset = "p2e0tuka";

export const NavbarItems = [
    {to:"/",label:"Home"},
    {to:"/about", label:"About"},
    {to:"/contactUs", label:"Contact Us"},
];