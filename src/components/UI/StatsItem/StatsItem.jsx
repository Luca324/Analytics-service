import classes from "./StatsItem.module.css";

const messages = {
  total_spend_galactic: "общие расходы в галактических кредитах",
  rows_affected: "количество обработанных записей",
  less_spent_at: "день года с минимальными расходами  ",
  big_spent_at: "день года с максимальными расходами  ",
  big_spent_civ: "цивилизация с максимальными расходами",
  less_spent_civ: "цивилизация с минимальными расходами",
  less_spent_value: "минимальная сумма расходов за день ",
  big_spent_value: "максимальная сумма расходов за день ",
  average_spend_galactic: " средние расходы в галактических кредитах",
};

function StatsItem({ data, id , classname}) {
  const message = messages[id];
  if (id === "less_spent_at" || id === "big_spent_at") {
    data = getDateFromDay(data);
  } else if (id === "average_spend_galactic") {
    data = Math.floor(data);
  }
  return (
    <div className={`${classname} ${classes.StatsItem}`}>
      <div className={classes.data}>{data}</div>
      <span>{message}</span>
    </div>
  );
}

function getDateFromDay(dayOfYear) {
  const date = new Date(2025, 0, dayOfYear);

  // Форматируем в "день месяц"
  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });

  return `${day} ${month}`;
}

export default StatsItem;
