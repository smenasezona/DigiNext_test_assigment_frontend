import {useGetEntitiesQuery} from '../../api/apiQueries.js'
import {useDeleteEntityMutation} from "../../api/apiQueries.js";
import {useUpdateEntityMutation} from "../../api/apiQueries.js";
import styles from './Entities.module.scss'
import CreateEntityForm from "../CreateEntityForm/CreateEntityForm.jsx";
import {useState} from "react";
import EditEntityModal from "../EditEntityModal/EditEntityModal.jsx";

function Entities() {
    const {data = [], isFetching, refetch} = useGetEntitiesQuery()
    const [deleteEntity] = useDeleteEntityMutation()
    const [editingEntity, setEditingEntity] = useState(null)
    const [updateEntity] = useUpdateEntityMutation()
    const [isEditing, setIsEditing] = useState(false)

    const handleDeleteEntity = async (name) => {
        try {
            await deleteEntity(name).unwrap()
            refetch()
        } catch (err) {
            console.error('Failed :(')
        }
    }

    const handleEditEntity = (entity) => {
        setEditingEntity(entity)
        setIsEditing(true)
    }

    const handleUpdateEntity = async (updateEnt) => {
        try {
            await updateEntity(updateEnt).unwrap()
            refetch()
            setIsEditing(false)
        } catch (err) {
            console.error('update failed :(')
        }
    }

    if (isFetching) return <div>Loading...</div>
    return (
        <>
            <CreateEntityForm/>
            <div className={styles.entityContainer}>
                {data.map((entity) => (
                    <div key={entity.name} className={styles.cardContainer}>
                        <h2 className={styles.entityName}>{entity.name}</h2>
                        <p className={styles.coordinates}>Coordinate: {entity.coordinate}</p>
                        <p>Labels: {entity.labels}</p>
                        <button className={styles.editBtn} onClick={() => handleEditEntity(entity)}>Edit</button>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteEntity(entity.name)}>Delete
                        </button>
                    </div>
                ))}
            </div>
            {isEditing && <EditEntityModal entity={editingEntity} onUpdateEntity={handleUpdateEntity}
                                           onClose={() => setIsEditing(false)}/>}
        </>
    )
}

export default Entities
