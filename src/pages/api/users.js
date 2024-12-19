import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'server', 'records.json');

  if (req.method === 'GET') {
    // Odczytaj dane z pliku JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Nie udało się odczytać danych' });
      }
      res.status(200).json(JSON.parse(data));
    });
  } else if (req.method === 'POST') {
    // Dodaj nowy użytkownik
    const newUser = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Nie udało się odczytać danych' });
      }

      const users = JSON.parse(data);
      newUser.id = users.length ? users[users.length - 1].id + 1 : 1; // Ustaw nowe ID
      users.push(newUser);

      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Nie udało się zapisać danych' });
        }
        res.status(201).json(newUser);
      });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metoda ${req.method} nie jest obsługiwana`);
  }
}