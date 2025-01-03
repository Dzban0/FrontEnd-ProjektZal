import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/button.module.css'; // Załaduj style
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja danych
    if (!username || !password) {
      setError('Wszystkie pola muszą być wypełnione');
      return;
    }

    setLoading(true);
    setError(''); // Resetowanie błędów przed wysłaniem

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Po udanej rejestracji, przekieruj użytkownika na stronę logowania
        router.push('/login');
      } else {
        // Wyświetlanie błędu z odpowiedzi serwera
        setError(data.message || 'Wystąpił błąd podczas rejestracji');
      }
    } catch (error) {
      // Obsługa błędów serwera (np. problem z połączeniem)
      setError('Błąd serwera, spróbuj ponownie później');
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
          <input
            type="text"
            placeholder="Dodaj nazwę użytkownika"
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
            placeholder="Podaj hasło"
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