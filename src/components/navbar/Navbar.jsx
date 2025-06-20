import classes from "./Navbar.module.css";
import upload from "../../assets/upload.svg";
import generator from "../../assets/generator.svg";
import history from "../../assets/history.svg";
import MyNavLink from "../MyNavLink/MyNavLink.jsx";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <MyNavLink tabName="uploader">
        <img src={upload} />
        <span>CSV Аналитик</span>
      </MyNavLink>
      <MyNavLink tabName="generator">
        <img src={generator} />
        <span>CSV Генератор</span>
      </MyNavLink>{" "}
      <MyNavLink tabName="history">
        <img src={history} />
        <span>История</span>
      </MyNavLink>
    </div>
  );
}

export default Navbar;
