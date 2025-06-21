import classes from "./Generator.module.css";
import { useState } from "react";
import loading from "../../assets/loading.svg";
import DoneBlock from "../../components/DoneBlock/DoneBlock";

function Generator() {
  const [error, setError] = useState(false);
  const [genState, setGenState] = useState("start");

  async function startGenerating() {
    const sendData = {
      size: 0.001,
      withErrors: "off",
      maxSpend: 1000,
    };

    const params = new URLSearchParams(sendData);
    const url = `http://localhost:3000/report?${params.toString()}`;

    setGenState("processing");

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  setGenState("done");
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) =>
        // Respond with our stream
        new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text()
      )
      .then((result) => {
        const blob = new Blob([result], { type: "text/csv" });
        const a = document.createElement("a");
        a.download = "input.csv";
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/csv", a.download, a.href].join(":");
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
