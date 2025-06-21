import { useState, useRef, useEffect } from "react";
import classes from "./Uploader.module.css";
import FileUploadArea from "../../components/FileUploadArea/FileUploadArea";
import Statistics from "../../components/Statistics/Statistics";
const AGGREGATE_URL = `http://localhost:3000/aggregate?rows=1000`;

function Uploader() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [statistics, setStatictics] = useState(null)

  function sendFile() {
    if (isUploaded) {
      const formData = new FormData();
      formData.append("file", uploadedFile, "report.csv");
      console.log(formData.get("file"));
      const decoder = new TextDecoder();

      fetch(AGGREGATE_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.body)
        .then((rb) => {
          const reader = rb.getReader();

          function readChunk() {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("DONE");
                return;
              }
              setStatictics(decoder.decode(value))

              readChunk();
            });
          }
          readChunk();
        })
        .catch((e) => {
          console.log("error", e);
        });
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
      { statistics ? <Statistics stats={statistics} /> 
      : ""

      }<>
      </>
    </div>
  );
}

export default Uploader;
