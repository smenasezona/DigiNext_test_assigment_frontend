import {useState} from 'react';
import {useEffect} from "react";
import Plot from 'react-plotly.js';
import {useGetCoordinatesQuery} from '../../api/apiQueries.js';
import styles from './HistogramModal.module.scss'

const HistogramModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {data: coordinatesData, error, isLoading, refetch} = useGetCoordinatesQuery();
    const [data, setData] = useState([])


    useEffect(() => {
        if (coordinatesData && coordinatesData.coordinates) {
            const violinData = coordinatesData.coordinates.map(coord => ({
                y: coord,
                type: 'violin',
                name: 'Entity ' + (coordinatesData.coordinates.indexOf(coord) + 1),
                box: {visible: true},
                meanline: {visible: true},
            }));
            setData(violinData);
            refetch()
        }
    }, [coordinatesData, refetch]);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
    }, [])

    return (
        <div>
            <button className={styles.visualBtn} onClick={openModal}>Visualize</button>
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
    );
};

export default HistogramModal;
