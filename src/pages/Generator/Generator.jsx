import classes from "./Generator.module.css";
import { useState } from "react";
import loading from "../../assets/loading.svg";
import DoneBlock from "../../components/DoneBlock/DoneBlock";

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    const sendData = {
      method: "GET",
      sizу: 0.01,
      withErrors: "off",
      maxSpend: 1000
    }
    setGenState("processing");
    fetch(" http://127.0.0.1:3000/report", sendData).then(res => {
      console.log('result', res)
      setGenState("done")
    }).catch(e => {
      console.log('error', e)
    })

  }

  function clearHandle() {
    console.log('clearing')
    setGenState("start");
    setError(false)
  }

  return (
    <div className={classes.Generator}>
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      {error ? (
        <>
        <DoneBlock error={error} color="green" clearAction={clearHandle}>Ошибка</DoneBlock>
        <span className={classes.error}>упс, не то...</span>
        </>
      ) 

      : genState === "start" ? (
        <button className={classes.start} onClick={() => startGenerating()}>
          Начать генерацию
        </button>
      ) 
      
      : genState === "processing" ? (
        <>
          <div className={classes.generating}>
            <img src={loading} />
          </div>
          <span>идёт процесс генерации</span>
        </>
      ) 
      
      : genState === "done" ? (
        <>
        <DoneBlock error={error} color="green" clearAction={clearHandle}>Done!</DoneBlock>
        <span>файл сгенерирован!</span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Generator;
