import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem('token', token);
            alert('Logged in!');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" className={styles.button}>Zaloguj się</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <Link href="/">
                    <button className={styles.button}>Powrót do Strony Głównej</button>
                </Link>
            </div>
        </div>
    );
}
