import { useState, useRef, useEffect } from "react";
import classes from "./Uploader.module.css";
import FileUploadArea from "../../components/FileUploadArea/FileUploadArea";
import Statistics from "../../components/Statistics/Statistics";
import {aggregatedDataReader} from "../../API/API.js"
const decoder = new TextDecoder();

function Uploader() {
  // const [uploaderState, setUploadedState] = useState('start')

  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [statistics, setStatictics] = useState(null);

  async function startAggregating() {
    if (isUploaded) {
      const reader = await aggregatedDataReader(uploadedFile);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setStatictics(decoder.decode(value));
      }
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
      <button className={classes.send} onClick={startAggregating}>
        Отправить
      </button>
      {statistics ? <Statistics stats={statistics} /> : ""}
    </div>
  );
}

export default Uploader;
