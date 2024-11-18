import React from "react";
import "../styles/Footer.css";
import { toast, Bounce } from "react-toastify";

function Footer() {
  //Hooks
  const [email, setEmail] = React.useState("");

  //Handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(email)) {
      toast.success(
        "Your email has been successfully added to our newsletter list.",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    } else {
      toast.error(
        "he email address you entered seems to be in an invalid format!",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    }
  };

  //Regexp function to validate email
  function validateEmail($email) {
    // eslint-disable-next-line no-useless-escape
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test($email);
  }

  return (
    <div className="footer">
      <header className="footerContent">
        <div className="footerContentTop">
          <div className="fctStreet">
            <h1>footer.</h1>
            <p>
              Rua Alexandre Dumas, 1711 - 6º andar - Chácara Santo Antônio, São
              Paulo - SP, 04717-004
            </p>
          </div>
          <div className="fctItens">
            <div className="fctItensLinks">
              <p>Links</p>
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Shop</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className="fctItensHelp">
              <p>Help</p>
              <ul>
                <li>
                  <a href="">Payment Options</a>
                </li>
                <li>
                  <a href="">Returns</a>
                </li>
                <li>
                  <a href="">Privacy Policies</a>
                </li>
              </ul>
            </div>
            <div className="fctNewsletter">
              <p>Newsletter</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Your Email Address"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
                <button type="submit">SUBSCRIBE</button>
              </form>
            </div>
          </div>
        </div>
        <div className="footerContentBot">
          <p>2024 Compass UOL</p>
        </div>
      </header>
    </div>
  );
}

export default Footer;