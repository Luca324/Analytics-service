import DoneBlock from "../UI/DoneBlock/DoneBlock";
import classes from "./FileUploadArea.module.css";
import { useState, useRef } from "react";

const FileUploadArea = (props) => {
  const { uploaderState, setUploaderState, uploadedFile, setUploadedFile, setStatictics, error, setError } = props;
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    setIsDragging(false);
    setError(null);
    processFile(e.dataTransfer);
  };

  const handleFileInputChange = (e) => {
    setUploaderState('start')
    processFile(e.target);
  };

  const processFile = (target) => {
    setUploaderState('processing')
    try {
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        setUploaderState('uploaded')
        setUploadedFile(file);
        setError(null);
      }
    } catch (err) {
      console.log('error', err)
      setError(err.message);
    }
  };

  const handleDragEnter = (e) => {
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    setIsDragging(false);
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
    console.log("clearing..");
    fileInputRef.current.value = ''
    setUploaderState('start')
  };

  return (
    <div
      className={`${classes.uploadContainer} ${
        isDragging ? classes.dragover : ""
      }  ${error ? classes.error : ""}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className={classes.fileInput}
        style={{ display: "none" }}
      />

      {uploaderState === 'uploaded' ? (
        <DoneBlock error={error} clearAction={() => clearFile()} color="green">
          {uploadedFile.name}
        </DoneBlock>
      ) : (
        <button className={classes.uploadButton} onClick={handleButtonClick}>
          Загрузите файл
        </button>
      )}
      {error ? (
        <span className={classes.error}>упс, не то...</span>
      ) : uploaderState === 'uploaded' ? (
        <span>файл загружен!</span>
      ) : uploaderState === 'processing' ? (
        <span>идёт парсинг файла</span>
      ) : uploaderState === 'done' ? (
        <span>готово!</span>
      ) : (
        <span>или перетащите сюда</span>
      )}
    </div>
  );
};

export default FileUploadArea;
