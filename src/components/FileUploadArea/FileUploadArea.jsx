import DoneBlock from "../DoneBlock/DoneBlock";
import classes from "./FileUploadArea.module.css";
import { useState, useRef } from "react";

const FileUploadArea = (props) => {
  const {isUploaded, setIsUploaded, uploadedFile, setUploadedFile} = props
  const [isDragging, setIsDragging] = useState(false);
 
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
    // setError(null);
    setError(true);

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
  };

  const handleDragEnter = (e) => {    setIsDragging(true);  };

  const handleDragLeave = (e) => {    setIsDragging(false);  };

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
      }  ${
        error ? classes.error : ""
      }
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
        <DoneBlock error clearAction={() => clearFile()} color="green">
          {uploadedFile.name}
        </DoneBlock>
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
