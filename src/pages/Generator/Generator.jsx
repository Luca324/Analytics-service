import classes from "./Generator.module.css";
import { useState } from "react";
import DoneBlock from "../../components/UI/DoneBlock/DoneBlock";
import Loading from "../../components/UI/Loading/Loading.jsx";

import  {fetchReportData, downloadTextAsScvFile} from '../../services/generatorService.js'

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    setGenState("processing");
    try {
      const result = await fetchReportData({
        size: 0.001,
        withErrors: "off",
        maxSpend: 1000,
      });

      if (result) {
        downloadTextAsScvFile(result);
        setGenState("done");
      }
    } catch (error) {
      setError(error);
    }
  }
  function clearHandle() {
    setGenState("start");
    setError(false);
  }

  return (
    <div className={classes.Generator}>
      <span data-testid="label">Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      {error ? (
        <>
          <DoneBlock error={error} color="green" clearAction={clearHandle}>
            Ошибка
          </DoneBlock>
          <span data-testid="err-msg" className={classes.error}>упс, не то...</span>
        </>
      ) : genState === "start" ? (
        <button data-testid="start-gen-btn" className={classes.start} onClick={() => startGenerating()}>
          Начать генерацию
        </button>
      ) : genState === "processing" ? (
        <>
          <Loading data-testid="loading-text" />
          <span >идёт процесс генерации</span>
        </>
      ) : genState === "done" ? (
        <>
          <DoneBlock error={error} color="green" clearAction={clearHandle}>
            Done!
          </DoneBlock>
          <span>файл сгенерирован!</span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}


export default Generator;
