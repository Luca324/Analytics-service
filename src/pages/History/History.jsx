import HistoryItem from "../../components/UI/HistoryItem/HistoryItem";
import classes from "./History.module.css";
import trash from "../../assets/Trash.svg";
import MyNavLink from "../../components/UI/MyNavLink/MyNavLink";
import { useHistoryStore } from "../../store/HistoryStore";

function History() {
  const { history, clearHistory, removeHistoryItem } = useHistoryStore();

  const historyData = Object.entries(history);

  function handleClearAll() {
    clearHistory();
  }

  function handleRemoveItem(id) {
    removeHistoryItem(id);
  }

  return (
    <>
      <div className={classes.History} data-testid="history-page">
        {historyData.map((item) => {
          const [key, value] = item;
          return (
            <div className={classes.listRow} key={key}>
              <HistoryItem item={item} />
              <button
              data-testid="remove"
                className={classes.delete}
                onClick={() => handleRemoveItem(key)}
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
