import fileIcon from '../../assets/fileIcon.svg'
import classes from './ListItem.module.css'
import Status from '../Status/Status'

function ListItem({filename, date, status}) {
    return ( <div className={classes.ListItem}>
        
        <img src={fileIcon} />
        <span>{filename}</span>
        <span>{date}</span>
        <Status status={status} />
       
</div>
)}

export default ListItem;