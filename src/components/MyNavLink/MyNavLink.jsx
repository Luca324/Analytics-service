import classes from "./MyNavLink.module.css";
import { useTabStore } from "../../store";
import { Link } from "react-router-dom";

function MyNavLink({tabName, children, ...props}) {
    const { activeTab, setActiveTab } = useTabStore();
  
    return ( <Link
        to={`/${tabName}`}
        className={`${classes.btn} ${activeTab === tabName ? classes.active : ""}`}
        onClick={() => setActiveTab(tabName)}
      >
        {children}
      </Link> );
}

export default MyNavLink;

