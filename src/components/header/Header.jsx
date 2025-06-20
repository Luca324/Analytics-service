import classes from "./Header.module.css";
import Navbar from "../navbar/Navbar";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <div className={classes.header}>
      <img src={logo} className={classes.logo} />
      <Navbar />
    </div>
  );
}

export default Header;
