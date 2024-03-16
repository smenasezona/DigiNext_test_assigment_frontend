import {useEffect, useState} from 'react'
import {useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Plot from 'react-plotly.js'
import {useGetCoordinatesQuery} from '../../api/apiQueries.js'
import styles from './HistogramModal.module.scss'
import {setIsModalOpen} from "../../api/slices/modalSlice.js"

const HistogramModal = () => {
    const dispatch = useDispatch()
    const modalIsOpen = useSelector(state => state.modal.isOpen)
    const {data: coordinatesData, error, isLoading, refetch} = useGetCoordinatesQuery()
    const [data, setData] = useState([])

    useEffect(() => {
        if (coordinatesData && coordinatesData.coordinates) {
            const violinData = coordinatesData.coordinates.map((coord, index) => ({
                y: coord,
                type: 'violin',
                name: `Entity ${index + 1}`,
                box: {visible: true},
                meanline: {visible: true},
            }))
            setData(violinData)
            refetch()
        }
    }, [coordinatesData, refetch])

    const closeModal = useCallback(() => {
        dispatch(setIsModalOpen(false))
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [closeModal])

    return (
        <div className={styles.modalContainer}>
            <button className={styles.visualBtn} onClick={() => dispatch(setIsModalOpen(true))}>Visualize</button>
            {modalIsOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeBtn} onClick={closeModal}>Close</button>
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {coordinatesData && (
                            <Plot
                                data={data}
                                layout={{width: 500, height: 400, title: 'Violin Plot'}}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HistogramModal
