import "../styles/Header.css";
// import { useState } from "react";
// import AuthenticateToken from "../utils/TokenValidation";
// import Cookies from "js-cookie";
// import { toast, Bounce } from "react-toastify";

function Header() {
  //const [logged, setLogged] = useState(AuthenticateToken());

  // const handleLogOut = () => {
  //   Cookies.remove("token");
  //   setLogged(AuthenticateToken());
  //   toast.info(`User logged out.`, {
  //     position: "top-right",
  //     autoClose: 3500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //     transition: Bounce,
  //   });
  //   if (window.location.pathname === "/checkout") {
  //     window.location.href = "/";
  //   }
  // };

  return (
    <header>      
      <ul>
        <li><a>Home</a></li>
        <li><a>Bookshelf</a></li>
        <li><a>About</a></li>
        <li><a>Logout</a></li>
      </ul>
    </header>
  );
}

export default Header;
