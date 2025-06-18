import classes from './Navbar.module.css'
import upload from '../../assets/upload.svg'
import generator from '../../assets/generator.svg'
import history from '../../assets/history.svg'

function Navbar() {


    return ( <div className={classes.navbar}>
        <button className={classes.active}><img src={upload} /><span>CSV Аналитик</span></button>
        <button className={classes.active}><img src={generator} /><span>CSV Генератор</span></button>
        <button className={classes.active}><img src={history} /><span>История</span></button>
    </div> );
}

export default Navbar;