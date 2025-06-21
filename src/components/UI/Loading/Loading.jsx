import loading from "../../../assets/loading.svg";
import classes from "./Loading.module.css";

function Loading() {
  return (
    <div className={classes.Loading}>
      <img src={loading} />
    </div>
  );
}

export default Loading;
