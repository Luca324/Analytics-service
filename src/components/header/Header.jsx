import classes from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <div className={classes.Header}>
      <img src={logo} className={classes.logo} />
      <Navbar />
    </div>
  );
}

export default Header;
