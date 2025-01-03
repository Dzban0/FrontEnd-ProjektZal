import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function Login() {
    const [username, setUsername] = useState(''); // Pole dla nazwy użytkownika
    const [password, setPassword] = useState(''); // Pole dla hasła
    const [error, setError] = useState(''); // Przechowywanie błędów
    const router = useRouter(); // Obsługa nawigacji w Next.js

    const handleLogin = async (e) => {
        e.preventDefault(); // Zapobiegaj przeładowaniu strony

        // Wysyłanie danych do API
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json(); // Odbierz odpowiedź z API

        if (data.success) {
            // Zapis tokena do localStorage (lub innej metody zarządzania sesją)
            localStorage.setItem('token', 'loggedIn');
            // Przekierowanie do tabeli
            router.push('/table');
        } else {
            // Wyświetlenie błędu z API
            setError(data.message);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Logowanie</h1>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Wpisz nazwę użytkownika"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            margin: '10px 0',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Wpisz hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            margin: '10px 0',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Zaloguj się
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <div style={{ marginTop: '20px' }}>
                <p>Nie masz konta? <Link href="/register">Zarejestruj się</Link></p>
            </div>

            <Link href="/">
                    <button className={styles.button} style={{ margin: '0.5rem' }}>
                        Powrót do strony głównej
                    </button>
            </Link>
        </div>
    );
}