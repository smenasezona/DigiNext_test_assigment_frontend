import {useCreateEntityMutation} from '../../api/apiQueries.js'
import {useGetEntitiesQuery} from '../../api/apiQueries.js'
import {useState} from "react"
import styles from './CreateEntityForm.module.scss'
import HistogramModal from "../HistogramModal/HistogramModal.jsx";


function CreateEntityForm() {
    const [name, setName] = useState('')
    const [coordinate, setCoordinate] = useState('')
    const [labels, setLabels] = useState('')
    const [createEntity, {isLoading}] = useCreateEntityMutation()
    const {refetch} = useGetEntitiesQuery()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createEntity({name, coordinate, labels}).unwrap()
            setName('')
            setCoordinate('')
            setLabels('')
            refetch()
        } catch (err) {
            console.error('Failed to create entity:', err)
        }
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.createForm} onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className={styles.input}
                />
                <input
                    value={coordinate}
                    onChange={(e) => setCoordinate(e.target.value)}
                    placeholder="Coordinates"
                    required
                    className={styles.input}
                />
                <input
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    placeholder="Labels"
                    required
                    className={styles.input}
                />
                <button className={styles.createBtn} type="submit" disabled={isLoading}>
                    Create
                </button>
            </form>
            <HistogramModal/>
        </div>
    )
}

export default CreateEntityForm
