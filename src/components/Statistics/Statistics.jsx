import classes from "./Statistics.module.css";
import StatsItem from "../UI/StatsItem/StatsItem";

function Statistics({ stats }) {
  const keys = Object.keys(stats);

  return (
    <div className={classes.Statistics}>
      {keys.map((key) => {
        return (
          <StatsItem
            id={key}
            data={stats[key]}
            classname={classes.StatsItem}
          ></StatsItem>
        );
      })}
    </div>
  );
}

export default Statistics;
