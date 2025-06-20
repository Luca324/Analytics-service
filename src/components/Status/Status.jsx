import classes from './Status.module.css'
import happySmileActive from '../../assets/happySmileActive.svg'
import happySmileUnactive from '../../assets/happySmileUnactive.svg'
import sadSmileActive from '../../assets/sadSmileActive.svg'
import sadSmileUnactive from '../../assets/sadSmileUnactive.svg'

function Status({status}) {
    return ( <div className={classes.Status}>
        {status === "success" ? 
    
    <><span>Обработан успешно</span><img src={happySmileActive} />
<span className={classes.unactive}>Не удалось обработать</span><img src={sadSmileUnactive}/></>
:
    <><span className={classes.unactive}>Обработан успешно</span><img src={happySmileUnactive} />
<span>Не удалось обработать</span><img src={sadSmileActive}/></>
}
</div>
)}

export default Status;