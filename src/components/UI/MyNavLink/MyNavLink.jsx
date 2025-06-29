import { Link } from "react-router-dom";
import { useTabStore } from "../../../store/TabStore"

function MyNavLink({ tabName, children, linkClassName, ...props }) {
      const { activeTab, setActiveTab } = useTabStore();
  
  return (
    <Link
      className={`${linkClassName}`}
      to={`/${tabName}`}
      onClick={() => setActiveTab(tabName)}
    >
      {children}
    </Link>
  );
}

export default MyNavLink;
