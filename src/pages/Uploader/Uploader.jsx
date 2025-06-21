import { useState, useRef, useEffect } from "react";
import classes from "./Uploader.module.css";
import FileUploadArea from "../../components/FileUploadArea/FileUploadArea";
import Statistics from "../../components/Statistics/Statistics";
import { aggregatedDataReader } from "../../API/API.js";
const decoder = new TextDecoder();

function Uploader() {
  const [uploaderState, setUploaderState] = useState("start");
  const [error, setError] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [statistics, setStatictics] = useState(null);

  async function startAggregating() {
    try {
      if (uploaderState === "uploaded") {
        const reader = await aggregatedDataReader(uploadedFile);

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          setStatictics(decoder.decode(value));
          setUploaderState("done");
        }
      }
    } catch (err) {
      console.log("error", err);
      setError(err.message);
    }
  }

  useEffect(() => {
if (uploaderState === 'start') {
    setError(null);
        setError(null);
    setStatictics(null)
    setUploadedFile(null);

}
  }, [uploaderState])

  return (
    <div className={classes.Uploader}>
      <p>
        Загрузите csv файл и получите полную информацию о нём за сверхнизкое
        время
      </p>
      <FileUploadArea
        uploaderState={uploaderState}
        setUploaderState={setUploaderState}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        setStatictics={setStatictics}
        error={error}
        setError={setError}
      />
      <button className={classes.send} onClick={startAggregating}>
        Отправить
      </button>
      {statistics ? <Statistics stats={statistics} /> : ""}
    </div>
  );
}

export default Uploader;
