const fs = require('fs');
const path = require('path');

// Przykładowe dane rejestru
const userRecords = [
    { id: 1, name: 'Jacek Kowalski', username: 'JKowalski', password:'1234'},
    { id: 2, name: 'Anna Nowak', username: 'ANowak',  password:'1234'}
];

// Wywołanie funkcji
saveRecords(userRecords);

// Funkcja do zapisywania rejestrów do pliku JSON
function saveRecords(records) {
    const filePath = path.join(__dirname, 'records.json');
    fs.writeFile(filePath, JSON.stringify(records, null, 2), (err) => {
        if (err) {
            console.error('Błąd podczas zapisywania rejestrów:', err);
        } else {
            console.log('Rejestry zostały zapisane pomyślnie!');
        }
    });
}

// Wywołanie funkcji
saveRecords(userRecords);