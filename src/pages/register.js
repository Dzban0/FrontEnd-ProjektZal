import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/button.module.css'; // Załaduj style
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Wszystkie pola muszą być wypełnione');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Po udanej rejestracji, przekieruj użytkownika na stronę logowania
        router.push('/login');
      } else {
        setError(data.message || 'Wystąpił błąd');
      }
    } catch (error) {
      setError('Błąd serwera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>
      <p>
        Masz już konto? <Link href="/login">Zaloguj się</Link>
      </p>

      <Link href="/">
        <button className={styles.button} style={{ margin: '0.5rem' }}>
          Powrót do strony głównej
        </button>
      </Link>
    </div>
  );
};

export default Register;
