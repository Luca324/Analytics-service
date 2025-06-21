import classes from "./Generator.module.css";
import { useState } from "react";
import loading from "../../assets/loading.svg";
import DoneBlock from "../../components/DoneBlock/DoneBlock";
import { reportDataReader } from "../../API/API.js";
const decoder = new TextDecoder();

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    try {
      const sendData = {
        size: 0.001,
        withErrors: "off",
        maxSpend: 1000,
      };

      const params = new URLSearchParams(sendData);
      const reader = await reportDataReader(params);
      setGenState("processing");
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
          <div className={classes.generating}>
            <img src={loading} />
          </div>
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
  const blob = new Blob([result], { type: "text/csv" });
  const a = document.createElement("a");
  a.download = "input.csv";
  a.href = URL.createObjectURL(blob);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default Generator;
