import DoneBlock from "../DoneBlock/DoneBlock";
import classes from "./FileUploadArea.module.css";
import { useState, useRef } from "react";

const FileUploadArea = (props) => {
  const { isUploaded, setIsUploaded, uploadedFile, setUploadedFile } = props;
  const [isDragging, setIsDragging] = useState(false);

  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    setIsDragging(false);
    setError(null);
    processFile(e.dataTransfer);
  };

  const handleFileInputChange = (e) => {
    setError(null);
    processFile(e.target);
  };

  const processFile = (target) => {
    try {
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        setIsUploaded(true);
        setUploadedFile(file);
        setError(null);
      }
    } catch (err) {
      console.log('error')
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
    setIsUploaded(false);
    setUploadedFile(null);
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

      {isUploaded ? (
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
      ) : isUploaded ? (
        <span>файл загружен!</span>
      ) : (
        <span>или перетащите сюда</span>
      )}
    </div>
  );
};

export default FileUploadArea;
