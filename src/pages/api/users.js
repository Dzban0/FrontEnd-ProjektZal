import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'server', 'records.json');

    let users = [];
    try {
        // Sprawdź, czy plik istnieje
        if (fs.existsSync(filePath)) {
            users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
            console.error('Plik records.json nie istnieje!');
            fs.writeFileSync(filePath, JSON.stringify([])); // Utwórz plik, jeśli nie istnieje
        }
    } catch (error) {
        console.error('Błąd podczas odczytu/zapisu pliku:', error);
        return res.status(500).json({ success: false, message: 'Błąd serwera' });
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Sprawdzanie użytkownika
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            return res.status(200).json({ success: true, message: 'Zalogowano pomyślnie' });
        } else {
            return res.status(401).json({ success: false, message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }
    }

    res.status(405).json({ success: false, message: 'Metoda nieobsługiwana' });
}