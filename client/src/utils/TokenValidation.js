import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify";

const AuthenticateToken = () => {
  const token = Cookies.get("token");

  if (token) {
    const dateNow = Math.floor(Date.now() / 1000);
    const decodedToken = jwtDecode(token);

    if (!(dateNow < decodedToken.exp)) {
      toast.info(`Your session expired! Please signin again.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      Cookies.remove("token");
      return false;
    }
    return true;
  } else {
    return false;
  }
};

export default AuthenticateToken;
