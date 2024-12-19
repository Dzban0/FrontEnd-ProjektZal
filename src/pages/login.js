import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/button.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Wczytaj dane użytkowników z pliku record.json
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/record.json");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Sprawdź, czy użytkownik istnieje w danych
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Zapisz token do localStorage
      localStorage.setItem("token", JSON.stringify({ username: user.username }));
      setError("");

      // Przekieruj na stronę table.js
      router.push("/table");
    } else {
      setError("Nieprawidłowa nazwa użytkownika lub hasło.");
    }
  };

  const handleGoHome = () => {
    router.push("/"); // Powrót do strony głównej
  };

  return (
    <div className={styles.formContainer}>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
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
          Zaloguj się
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <button onClick={handleGoHome} className={styles.button} style={{ marginTop: "1rem" }}>
        Powrót do strony głównej
      </button>
    </div>
  );
};

export default Login;