import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/table.module.css';
import TableHeader from '../components/table/TableHeader';
import { headers, initialData } from '../components/table/data';

export default function Table() {
    const router = useRouter();

    const [rows, setRows] = useState(initialData);
    const [hiddenRows, setHiddenRows] = useState([]);
    const [newRow, setNewRow] = useState(['', '', '', '']);
    const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

    // Sortowanie tabeli
    const handleSort = (columnIndex) => {
        const newRows = [...rows];
        const ascending = sortOrder.column === columnIndex ? !sortOrder.ascending : true;


        newRows.sort((a, b) => {
            const cellA = a[columnIndex].toString().toLowerCase();
            const cellB = b[columnIndex].toString().toLowerCase();
            if (cellA < cellB) return ascending ? -1 : 1;
            if (cellA > cellB) return ascending ? 1 : -1;
            return 0;
        });


        setRows(newRows);
        setSortOrder({ column: columnIndex, ascending });
    };


    const toggleRow = (index) => {
        if (hiddenRows.includes(index)) {
            setHiddenRows(hiddenRows.filter((row) => row !== index));
        } else {
            setHiddenRows([...hiddenRows, index]);
        }
    };


    const handleLogout = () => {
        router.push('/login');
    };


    const handleInputChange = (index, value) => {
        const updatedRow = [...newRow];
        updatedRow[index] = value;
        setNewRow(updatedRow);
    };


    const handleAddRow = () => {
        if (newRow.some((cell) => cell.trim() === '')) {
            alert('Wszystkie pola muszą być wypełnione.');
            return;
        }
        setRows([...rows, newRow]);
        setNewRow(['', '', '', '']); // Resetowanie formularza
    };


    if (!Array.isArray(rows)) {
        return <div>Brak danych do wyświetlenia.</div>;
    }


    return (
        <div style={{ padding: '2rem' }}>
            <h1>Tabela danych</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} onClick={() => handleSort(index)}>
                                {header}
                                {sortOrder.column === index && (sortOrder.ascending ? ' ↑' : ' ↓')}
                            </th>
                        ))}
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) =>
                        hiddenRows.includes(index) ? (
                            <tr key={index} className={styles.hiddenRow}>
                                <td colSpan={headers.length + 1}>
                                    <button className={styles.button} onClick={() => toggleRow(index)}>
                                        Przywróć wiersz
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={index} className={styles.formRow}>
                                {row.map((cell, i) => (
                                    <td key={i}>{cell}</td>
                                ))}
                                <td>
                                    <button className={styles.button} onClick={() => toggleRow(index)}>
                                        Ukryj
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>


            <h2>Dodaj nowy wiersz</h2>
            <div className={styles.formRow}>
                {headers.map((header, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={header}
                        value={newRow[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className={styles.input}
                    />
                ))}
                <button onClick={handleAddRow} className={styles.button}>
                    Dodaj
                </button>
            </div>
            <div className={styles.logout}>
                <button onClick={handleLogout} className={styles.button}>
                    Wyloguj
                </button>
            </div>
        </div>
    );
}