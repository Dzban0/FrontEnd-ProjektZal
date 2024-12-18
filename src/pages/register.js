import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/button.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error during registration');
      }

      setIsRegistered(true); // Zmieniamy stan na zarejestrowany
      alert('Registration successful');
    } catch (error) {
      setError('Error during registration');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>Zarejestruj się</button>
      </form>
        <div style={{ marginTop: '20px' }}>
                <Link href="/">
                    <button className={styles.button}>Powrót do Strony Głównej</button>
                </Link>
        </div>

      {/* Wyświetlanie linku do logowania po udanej rejestracji */}
      {isRegistered && (
        <div className={styles.successMessage}>
          <p>Registration successful! Please <Link href="/login">zaloguj się</Link>.</p>
        </div>
      )}
    </div>
  );
};

export default Register;