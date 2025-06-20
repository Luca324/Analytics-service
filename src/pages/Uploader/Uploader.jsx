import { useState, useRef } from "react";
import classes from './Uploader.module.css'
import FileUploadArea from '../../components/FileUploadArea/FileUploadArea';

function Uploader() {
     const [isUploaded, setIsUploaded] = useState(false);
      const [uploadedFile, setUploadedFile] = useState(null);

    return ( <div className={classes.Uploader}>
        <p>Загрузите csv файл и получите полную информацию о нём за сверхнизкое время</p>
        <FileUploadArea 
        isUploaded={isUploaded}
        setIsUploaded={setIsUploaded}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        />
        <button className={classes.send}>Отправить</button>
    </div> );
}

export default Uploader;