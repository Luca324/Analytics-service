import classes from "./Generator.module.css";
import { useState } from "react";
import loading from "../../assets/loading.svg";
import DoneBlock from "../../components/DoneBlock/DoneBlock";

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    const sendData = {
      size: 0.01,
      withErrors: "off",
      maxSpend: 1000,
    };

    const params = new URLSearchParams(sendData);
    const url = `http://localhost:3000/report?${params.toString()}`;

    setGenState("processing");
    fetch(url, {
      method: "GET",
    })
      .then(async (got) => {
        const stream = got.body;
        console.log("stream", stream);
        const reader = stream.getReader();
        const read = await reader.read();
        console.log("read", read);
        const { done, value } =  read
        if (done) {
          console.log("done!!!!");
        }
        console.log("chunk", value);
      })
      .catch((e) => {
        console.log("error", e);
        setGenState("start");
      });
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

export default Generator;
