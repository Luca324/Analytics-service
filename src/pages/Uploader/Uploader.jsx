import { useState, useRef, useEffect } from "react";
import classes from "./Uploader.module.css";
import FileUploadArea from "../../components/FileUploadArea/FileUploadArea";
import Statistics from "../../components/Statistics/Statistics";
const AGGREGATE_URL = `http://localhost:3000/aggregate?rows=1000`;

function Uploader() {
  // const [uploaderState, setUploadedState] = useState('start')

  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [statistics, setStatictics] = useState(null);

  function startAggregating() {
    if (isUploaded) {
      const reader = aggregatedDataReader(uploadedFile);

      function readChunk() {
        reader.read().then(({ done, value }) => {
          if (done) {
            return;
          }
          setStatictics(decoder.decode(value));

          readChunk();
        });
      }
      readChunk();
    }
  }

  return (
    <div className={classes.Uploader}>
      <p>
        Загрузите csv файл и получите полную информацию о нём за сверхнизкое
        время
      </p>
      <FileUploadArea
        isUploaded={isUploaded}
        setIsUploaded={setIsUploaded}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />
      <button className={classes.send} onClick={sendFile}>
        Отправить
      </button>
      {statistics ? <Statistics stats={statistics} /> : ""}
    </div>
  );
}

export default Uploader;
