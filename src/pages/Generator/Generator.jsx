import classes from "./Generator.module.css";
import { useState } from "react";
import DoneBlock from "../../components/UI/DoneBlock/DoneBlock";
import Loading from "../../components/UI/Loading/Loading.jsx";
import { reportDataReader } from "../../API/API.js";
const decoder = new TextDecoder();

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    console.log('processing')
    setGenState("processing");
    try {
      const sendData = {
        size: 0.001,
        withErrors: "off",
        maxSpend: 1000,
      };

      const params = new URLSearchParams(sendData);
      const reader = await reportDataReader(params);
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setGenState("done");
          break;
        }
        result += decoder.decode(value);
      }

      if (result) {
        downloadTextAsScvFile(result);
      }
    } catch (error) {
      setError(error);
    }
  }
  function clearHandle() {
    console.log("clearing");
    setGenState("start");
    setError(false);
  }

  return (
    <div className={classes.Generator}>
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      {error ? (
        <>
          <DoneBlock error={error} color="green" clearAction={clearHandle}>
            Ошибка
          </DoneBlock>
          <span className={classes.error}>упс, не то...</span>
        </>
      ) : genState === "start" ? (
        <button className={classes.start} onClick={() => startGenerating()}>
          Начать генерацию
        </button>
      ) : genState === "processing" ? (
        <>
          <Loading />
          <span>идёт процесс генерации</span>
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

function downloadTextAsScvFile(text) {
  const blob = new Blob([text], { type: "text/csv" });
  const a = document.createElement("a");
  a.download = "input.csv";
  a.href = URL.createObjectURL(blob);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default Generator;
