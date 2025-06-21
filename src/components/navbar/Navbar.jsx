import classes from "./Navbar.module.css";
import upload from "../../assets/upload.svg";
import generator from "../../assets/generator.svg";
import history from "../../assets/history.svg";
import MyNavLink from "../MyNavLink/MyNavLink.jsx";
import { useTabStore } from "../../store";

function Navbar() {
    const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className={classes.navbar}>
      <MyNavLink tabName="uploader"
      linkClassName={`${classes.btn} ${activeTab === "uploader" ? classes.active : ""}`}
      >
        <img src={upload} />
        <span>CSV Аналитик</span>
      </MyNavLink>
      <MyNavLink tabName="generator"
      linkClassName={`${classes.btn} ${activeTab === "generator" ? classes.active : ""}`}
      >
        <img src={generator} />
        <span>CSV Генератор</span>
      </MyNavLink>{" "}
      <MyNavLink tabName="history"
      linkClassName={`${classes.btn} ${activeTab === "history" ? classes.active : ""}`}
      >
        <img src={history} />
        <span>История</span>
      </MyNavLink>
    </div>
  );
}

export default Navbar;
