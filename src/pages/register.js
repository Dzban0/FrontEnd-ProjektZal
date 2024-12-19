import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/button.module.css";
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ username, password }));
    setMessage("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
  };

  const handleGoHome = () => {
    router.push("/"); // Powrót do strony głównej
  };

  return (
    <div className={styles.formContainer}>
      <h1>Rejestracja</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Zarejestruj się
        </button>
        
        {message && <p className={styles.success}>{message}</p>}
      </form>

      <Link href="/login">
        <button className={styles.button} style={{ margin: '0.5rem' }}>
            Zaloguj się
        </button>
      </Link>

      <button onClick={handleGoHome} className={styles.button} style={{ marginTop: "1rem" }}>
        Powrót do strony głównej
      </button>
    </div>
  );
};

export default Register;