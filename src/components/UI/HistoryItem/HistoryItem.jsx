import fileIcon from "../../../assets/fileIcon.svg";
import classes from "./HistoryItem.module.css";
import Status from "../Status/Status";
import Modal from "../../UI/Modal/Modal";
import { useState } from "react";
import StatsItem from "../StatsItem/StatsItem";

function HistoryItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, value] = item;
  let { fileName: filename, status, stats } = value;
  const date = formatDate(key);

  if (stats) stats = JSON.parse(stats);

  function handleItemClick() {
    setIsOpen(true);
  }

  return (
    <>
      <button className={classes.HistoryItem} onClick={handleItemClick}>
        <div className={classes.filenameWrapper}>
          <img src={fileIcon} />
          <span>{filename}</span>
        </div>
        <span>{date}</span>
        <Status status={status} />
      </button>
      {stats ? (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={classes.statsWrapper}>
            {Object.keys(stats).map((key) => {
              return (
                <StatsItem
                  key={stats[key]}
                  id={key}
                  data={stats[key]}
                  classname={classes.StatsItem}
                ></StatsItem>
              );
            })}
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default HistoryItem;

function formatDate(date) {
  date = new Date(parseInt(date));
  var dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = "0" + yy;

  return dd + "." + mm + "." + yy;
}
