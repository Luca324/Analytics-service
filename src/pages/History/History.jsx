import ListItem from "../../components/UI/ListItem/ListItem";
import classes from "./History.module.css";
import trash from "../../assets/Trash.svg";
import { Link } from "react-router-dom";
import MyNavLink from "../../components/UI/MyNavLink/MyNavLink";
import { useHistoryStore } from "../../store";

function History() {
  const { history, addHistoryItem, clearHistory, removeHistoryItem } =
    useHistoryStore();
  console.log(history);
  const historyData = Object.entries(history).reduce((arr, [key, el]) => {
    arr.push({
      key: key,
      name: el.fileName,
      date: formatDate(key),
      status: el.status,
    });
    return arr;
  }, []);
  console.log(historyData);

  function handleClearAll() {
    clearHistory();
  }

  function handleRemoveItem(id) {
    removeHistoryItem(id);
  }

  return (
    <>
      <div className={classes.History}>
        {historyData.map((item) => {
          return (
            <div className={classes.listRow}>
              <ListItem
                key={item.key}
                filename={item.name}
                date={item.date}
                status={item.status}
              />
              <button
                className={classes.delete}
                onClick={() => handleRemoveItem(item.key)}
              >
                <img src={trash} />
              </button>
            </div>
          );
        })}
        <div className={classes.btns}>
          <MyNavLink linkClassName={classes.toGenerator} tabName="generator">
            <span>Сгенерировать больше</span>
          </MyNavLink>
          <button className={classes.clearAll} onClick={handleClearAll}>
            Очистить всё
          </button>
        </div>
      </div>
    </>
  );
}

export default History;

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
