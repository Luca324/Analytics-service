import classes from './FileUploadArea.module.css';
import { useCallback, useState, useRef } from 'react';

import loading from "../../assets/loading.svg"

const FileUploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
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
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      setUploadedFile(files[0])
      setIsUploaded(true)
      console.log('uploadedFile:', uploadedFile);
      // Здесь можно обработать файлы
    }
  }, []);

  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      setUploadedFile(files[0])
      console.log('uploadedFile:', uploadedFile);
      // Здесь можно обработать файлы
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div
      className={`${classes.uploadContainer} ${isDragging ? classes.dragover : ''}`}
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
        style={{ display: 'none' }}
      />
      <button className={classes.uploadButton} onClick={handleButtonClick}>
        Загрузите файл
      </button>
      {isUploaded ? <div className={classes.uploaded}>{}</div> : ''}
      {isDragging ? <div className={classes.loading}><img src={loading} /></div> : ''}
      <div className={classes.uploadText}>или перетащите сюда</div>
    </div>
  );
};

export default FileUploadArea;