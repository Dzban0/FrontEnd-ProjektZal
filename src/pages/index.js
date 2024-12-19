import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function Home() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Witaj w aplikacji tabeli!</h1>
            <p>Aplikacja prezentuje funkcje sortowania, collapse dla danych w tabeli i dodawanie nowych wierszy do tabeli</p>

            <div style={{ marginTop: '1.5rem' }}>
                <Link href="/login">
                    <button className={styles.button} style={{ margin: '0.5rem' }}>
                        Zaloguj się
                    </button>
                </Link>
                <Link href="/register">
                    <button className={styles.button} style={{ margin: '0.5rem' }}>
                        Zarejestruj się
                    </button>
                </Link>
                <Link href="/table">
                    <button className={styles.button} style={{ margin: '0.5rem' }}>
                        Tabela
                    </button>
                </Link>
            </div>

            <p style={{ marginTop: '2rem', fontSize: '14px', color: '#555' }}>
                Autor: Paweł Bierżyński
            </p>
        </div>
    );
}