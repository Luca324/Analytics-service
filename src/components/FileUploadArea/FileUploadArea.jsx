import DoneBlock from "../UI/DoneBlock/DoneBlock";
import Loading from "../UI/Loading/Loading";
import classes from "./FileUploadArea.module.css";
import { useState, useRef } from "react";

const FileUploadArea = (props) => {
  const { uploaderState, setUploaderState, uploadedFile, setUploadedFile, error, setError } = props;
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Добавлено для надежности
    setIsDragging(false);
    setError(null);
    processFile(e.dataTransfer);
  };

  const handleFileInputChange = (e) => {
    processFile(e.target);
  };

  const processFile = (target) => {
    try {
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        setUploaderState('uploaded')
        setUploadedFile(file);
        setError(null);
      }
    } catch (err) {
      console.error('error', err)
      setError(err.message);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
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
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
      data-testid="input-file"
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className={classes.fileInput}
        style={{ display: "none" }}
      />
      {uploaderState === 'uploaded' || uploaderState === 'done' || error ? (
        <DoneBlock data-testid="uploaded-file" error={error} clearAction={() => clearFile()} color="green">
          {uploadedFile.name}
        </DoneBlock>
      ) : ""}
      {error ? (
        <span className={classes.error}>упс, не то...</span>
      ) : uploaderState === 'start' ? (
        <><button className={classes.uploadButton} onClick={handleButtonClick}>
          Загрузите файл
        </button>
        <span>или перетащите сюда</span></>
      ) : uploaderState === 'processing' ? (
        <>
        <Loading data-testid="loading"/>
        <span>идёт парсинг файла</span>
        </>
      ) : uploaderState === 'uploaded' ? (
        <span>файл загружен!</span>
      )  : uploaderState === 'done' ? (
        <span>готово!</span>
      ) : "" }
    </div>
  );
};

export default FileUploadArea;