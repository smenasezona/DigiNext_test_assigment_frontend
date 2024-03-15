import {useState} from "react";
import {useEffect} from "react";
import styles from './EditEntityModal.module.scss'


function EditEntityModal({entity, onUpdateEntity, onClose}) {
    const [name, setName] = useState(entity.name)
    const [coordinate, setCoordinate] = useState(entity.coordinate)
    const [labels, setLabels] = useState(entity.labels)

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateEntity({...entity, name, coordinate, labels})
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [onClose])

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2>Edit Entity</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="coordinate">Coordinates:</label>
                    <input
                        type="text"
                        id="coordinate"
                        value={coordinate}
                        onChange={(e) => setCoordinate(e.target.value)}
                    />

                    <label htmlFor="labels">Labels:</label>
                    <input
                        type="text"
                        id="labels"
                        value={labels}
                        onChange={(e) => setLabels(e.target.value)}
                    />

                    <div className={styles.buttons}>
                        <button className={styles.saveBtn} type="submit">Save</button>
                        <button className={styles.cancelBtn} type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEntityModal