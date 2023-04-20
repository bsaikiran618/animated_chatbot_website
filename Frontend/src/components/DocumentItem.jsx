import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export const DocumentItem = ({file, deleteFile}) => {
    return (
        <li className="docu-list-item" key={file.name}>
            <div className="doc-icon docu-list-item-div">
                <FontAwesomeIcon icon={faFileAlt} />
            </div>
            <div className="file-name docu-list-item-div">
                <p> {file.name} </p>
            </div>
            <div className="doc-delete-icon docu-list-item-div">
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteFile(file.name)} />
            </div>
        </li>
    );
};