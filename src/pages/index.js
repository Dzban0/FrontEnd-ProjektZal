import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function Home() {
    return (
        <div style={{padding: '2rem', textAlign: 'center'}}>
            <h1>Witaj w aplikacji tabeli!</h1>
            <p>Aplikacja prezentuje funkcje sortowania, collapse dla danych w tabeli i dodawanie nowych danych do tabeli</p>
            <p></p>

            <div>
                <Link href="/login">
                    <button className={styles.button}>Zaloguj się</button>
                </Link>
                <Link href="/table">
                    <button className={styles.button}>Zobacz Tabelę</button>
                </Link>
            </div>

            <p>Autor: Paweł Bierżyński</p>
        </div>
    );
}
