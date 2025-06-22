import { useState, useRef, useEffect } from "react";
import classes from "./Uploader.module.css";
import FileUploadArea from "../../components/FileUploadArea/FileUploadArea";
import Statistics from "../../components/Statistics/Statistics";
import { aggregatedDataReader } from "../../API/API.js";
import { useHistoryStore } from "../../store/index.js";

const decoder = new TextDecoder();

function Uploader() {
  const { history, addHistoryItem, clearHistory } = useHistoryStore();
  const [uploaderState, setUploaderState] = useState("start");
  const [error, setError] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [statistics, setStatistics] = useState(null);

  async function startAggregating() {
    if (uploaderState === "uploaded" || uploaderState === "done") {
      setUploaderState("processing");
      try {
        const reader = await aggregatedDataReader(uploadedFile);
        let finalStats = null;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const stats = decoder.decode(value);
          finalStats = stats;
          setStatistics(JSON.parse(stats));
        }
        setUploaderState("done");

        addHistoryItem({
          status: "success",
          fileName: uploadedFile.name,
          stats: finalStats,
        });
      } catch (err) {
        console.error(err);
        setError(err.message);

        addHistoryItem({
          status: "fail",
          fileName: uploadedFile.name,
        });
      }
    }
  }

  useEffect(() => {
    if (uploaderState === "start") {
      setError(null);
      setStatistics(null);
      setUploadedFile(null);
    }
  }, [uploaderState]);

  useEffect(() => {
    setStatistics(null);
  }, [error]);

  return (
    <div className={classes.Uploader}>
      <p>
        Загрузите csv файл и получите полную информацию о нём за сверхнизкое время
      </p>
      <FileUploadArea
        uploaderState={uploaderState}
        setUploaderState={setUploaderState}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        setStatistics={setStatistics}
        error={error}
        setError={setError}
      />
      {uploaderState === "start" || uploaderState === "uploaded" ? (
        <button
          className={classes.send}
          disabled={uploaderState === "start"}
          onClick={startAggregating}
        >
          Отправить
        </button>
      ) : (
        ""
      )}
      {statistics ? (
        <Statistics stats={statistics} />
      ) : (
        <div className={classes.highlightsStub}>Здесь появятся хайлайты</div>
      )}
    </div>
  );
}

export default Uploader;
