import ListItem from "../../components/ListItem/ListItem";
import classes from "./History.module.css";
import trash from "../../assets/Trash.svg"

function History() {
  return (
    <div className={classes.History}>
      <div className={classes.listRow}>
        <ListItem
          filename="file_uploaded_1.csv"
          date="22.02.2025"
          status="success"
        />
      <button className={classes.delete}><img src={trash} /></button>
      </div>
    </div>
  );
}

export default History;
