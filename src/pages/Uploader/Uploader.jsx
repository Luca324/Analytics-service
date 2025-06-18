import { useState, useRef } from "react";
import classes from './Uploader.module.css'
import FileUploadArea from '../../components/FileUploadArea/FileUploadArea';

function Uploader() {
     const [isUploaded, setIsUploaded] = useState(false);
      const [uploadedFile, setUploadedFile] = useState(null);

    return ( <div className={classes.Uploader}>
        <p>Загрузите csv файл и получите полную информацию о нём за сверхнизкое время</p>
        <FileUploadArea 
        usUploaded={isUploaded}
        setIsUploaded={setIsUploaded}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        ></FileUploadArea>
        <button>Send</button>
    </div> );
}

export default Uploader;