import classes from "./DoneBlock.module.css";
import clear from "../../assets/clear.svg";

function DoneBlock({ children, error, clearAction, color }) {
  return (
    <div className={classes.uploadedWrapper}>
      <div className={`${classes.uploaded} 
      ${color === 'green' ? classes.green : classes.violet} 
      ${error ? classes.error : ""}`}>
        {children}
      </div>
      <button className={classes.clear} onClick={() => clearAction()}>
        <img src={clear} alt="Очистить" />
      </button>
    </div>
  );
}

export default DoneBlock;
