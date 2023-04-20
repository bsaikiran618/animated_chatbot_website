import { DocumentItem } from "./DocumentItem";

export const DocumentList = ({files, setFiles}) => {
    const deleteFileHandler = (_name) => {
        const updatedFiles = files.filter(file => file.name != _name);
        setFiles([...updatedFiles]);
    }
    return (
        <ul className="docu-list">
            {
                files &&
                files.map(f => <DocumentItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler}
                />)
            }
        </ul>
    );
}