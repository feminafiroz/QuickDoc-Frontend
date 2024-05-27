import showToast, { ToastType } from "./toaster";
import store from "../redux/store/store";
import { clearUser } from "../redux/slices/UserSlice";
import { clearDoctor } from "../redux/slices/DoctorSlice";

const logout = (message: string, type: ToastType = "success"): void => {
  store.dispatch(clearUser());
  showToast(message, type);
};

 export const doctorlogout = (message: string, type: ToastType = "success"): void => {
  store.dispatch(clearDoctor());
  showToast(message, type);
};

export default logout;