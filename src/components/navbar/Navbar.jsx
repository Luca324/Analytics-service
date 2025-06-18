import classes from './Navbar.module.css'

function Navbar() {


    return ( <div className={classes.navbar}>
        <button className={classes.active}>CSV Аналитик</button>
        <button className={classes.active}>CSV Генератор</button>
        <button className={classes.active}>История</button>
    </div> );
}

export default Navbar;