import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Both fields are required');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const { token } = await res.json();
                localStorage.setItem('token', token);
                alert('Logged in successfully!');
                router.push('/table'); // Redirect to Table.js after successful login
            } else {
                const { message } = await res.json();
                setError(message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>

                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Logging in...' : 'Zaloguj się'}
                </button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link href='/'>
                    <button className={styles.button}>Powrót do Strony Głównej</button>
                </Link>
            </div>
        </div>
    );
}
