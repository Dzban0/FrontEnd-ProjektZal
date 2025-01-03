import { hash } from 'bcryptjs'; // Do hashowania haseł
import { connectToDatabase } from '../../utils/db'; // Funkcja pomocnicza do łączenia z bazą danych

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' }); // Obsługa tylko POST
    }

    const { username, password } = req.body;

    // Walidacja danych wejściowych
    if (!username || !password) {
        return res.status(400).json({ message: 'Wszystkie pola muszą być wypełnione' });
    }

    try {
        const { db } = await connectToDatabase(); // Połącz z bazą danych

        // Sprawdź, czy użytkownik już istnieje
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Nazwa użytkownika jest już zajęta' });
        }

        // Hashowanie hasła
        const hashedPassword = await hash(password, 10);

        // Dodanie użytkownika do bazy danych
        await db.collection('users').insertOne({
            username,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
}
