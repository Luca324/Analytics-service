import classes from "./FileUploadArea.module.css";
import { useState, useRef } from "react";
import clear from "../../assets/clear.svg";

const FileUploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Проверка файла перед обработкой


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    try {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileInputChange = (e) => {
    setError(null);

    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        processFile(file);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const processFile = (file) => {
    setIsUploaded(true);
    setUploadedFile(file);
    console.log("Файл успешно загружен:", file.name);
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
    console.log("clearing..");
    setIsUploaded(false);
    setUploadedFile(null);
  };

  return (
    <div
      className={`${classes.uploadContainer} ${
        isDragging ? classes.dragover : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
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

      {error && (
        <div className={classes.error}>
          {error}
          <button onClick={() => setError(null)} className={classes.errorClose}>
            ×
          </button>
        </div>
      )}

      {isUploaded ? (
        <div className={classes.uploadedWrapper}>
          <div className={classes.uploaded}>{uploadedFile.name}</div>
          <button className={classes.clear} onClick={clearFile}>
            <img src={clear} alt="Очистить" />
          </button>
        </div>
      ) : (
        <button className={classes.uploadButton} onClick={handleButtonClick}>
          Загрузите файл
        </button>
      )}
      {error ?
      <span className={classes.error}>упс, не то...</span>
      :
      isUploaded ?
      <span>файл загружен!</span>
      :
      <span>или перетащите сюда</span>
}
    </div>
  );
};

export default FileUploadArea;
