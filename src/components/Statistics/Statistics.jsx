import classes from './Statistics.module.css'
import StatsItem from "../UI/StatsItem/StatsItem";

function Statistics({stats}) {
    stats = JSON.parse(stats)
    const keys = Object.keys(stats)

return ( <div className={classes.Statistics}>
        {keys.map(key => {
    return <StatsItem id={key} data={stats[key]}></StatsItem>

    })}
    
    </div> );
}

export default Statistics;