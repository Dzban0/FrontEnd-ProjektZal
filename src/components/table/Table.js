import { useState } from 'react';
import styles from '../../styles/table.module.css';
import TableHeader from '../TableHeader.js';

export default function Table({ headers, data }) {
    const [rows, setRows] = useState(data);
    const [hiddenRows, setHiddenRows] = useState([]);

    const toggleRow = (index) => {
        if (hiddenRows.includes(index)) {
            setHiddenRows(hiddenRows.filter(row => row !== index));
        } else {
            setHiddenRows([...hiddenRows, index]);
        }
    };

    return (
        <table className={styles.table}>
            <TableHeader headers={headers} />
            <tbody>
                {rows.map((row, index) => (
                    hiddenRows.includes(index) ? (
                        <tr key={index} className={styles.hiddenRow}>
                            <td colSpan={headers.length}>
                                <button className={styles.button} onClick={() => toggleRow(index)}>
                                    Restore row
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={index}>
                            {row.map((cell, i) => <td key={i}>{cell}</td>)}
                            <td>
                                <button className={styles.button} onClick={() => toggleRow(index)}>
                                    Collapse
                                </button>
                            </td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
    );
}