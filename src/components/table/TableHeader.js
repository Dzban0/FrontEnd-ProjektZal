import { useState } from 'react';
import styles from './table.module.css';

export default function TableHeader({ headers }) {
    const [order, setOrder] = useState('asc');
    const [sortedIndex, setSortedIndex] = useState(null);

    const handleSort = (colIndex) => {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        setOrder(newOrder);
        setSortedIndex(colIndex);
        // Implementowanie logiki sortowania, np. po porównaniu
        console.log(`Sortuj kolumnę ${colIndex} w porządku ${newOrder}`);
    };

    return (
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>
                        {header}
                        <button className={styles.button} onClick={() => handleSort(index)}>
                            {order === 'asc' ? '↑' : '↓'}
                        </button>
                    </th>
                ))}
            </tr>
        </thead>
    );
}