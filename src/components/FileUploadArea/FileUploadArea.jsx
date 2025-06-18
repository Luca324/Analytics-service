import classes from "./FileUploadArea.module.css";
import { useCallback, useState, useRef } from "react";

import loading from "../../assets/loading.svg";
import clear from "../../assets/clear.svg";

const FileUploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e) => {
    console.log("drop");
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      [0];
      processFile(file);
    }
  }, []);

  const handleFileInputChange = useCallback((e) => {
    console.log("file input change");

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const processFile = (file) => {
    setIsUploaded(true);
    setUploadedFile(file);
    console.log("new file:", file.name);
  };

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className={classes.fileInput}
        style={{ display: "none" }}
      />
      
      {isUploaded ? (
        <div className={classes.uploadedWrapper}>
          <div className={classes.uploaded}>{uploadedFile.name}</div>
          <button className={classes.clear} onClick={clearFile}>
            <img src={clear} />
          </button>
        </div>
      ) : (
        <button className={classes.uploadButton} onClick={handleButtonClick}>
        Загрузите файл
      </button>
      )}
      <span>или перетащите сюда</span>
    </div>
  );
};

export default FileUploadArea;
