import classes from './Uploader.module.css'
import FileUploadArea from '../../components/FileUploadArea/FileUploadArea';

function Uploader() {
    return ( <div className={classes.Uploader}>
        <p>Загрузите csv файл и получите полную информацию о нём за сверхнизкое время</p>
        <FileUploadArea></FileUploadArea>
    </div> );
}

export default Uploader;