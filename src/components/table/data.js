export const headers = ['Imię', 'Nazwisko', 'Rok Urodzenia', 'Wiek', 'Miasto'];

// Helper function to calculate age based on the year of birth
const calculateAge = (yearOfBirth) => new Date().getFullYear() - yearOfBirth;

export const initialData = [
    ['Piotr', 'Kowalski', 1997, null, 'Kraków'],
    ['Ewa', 'Nawałek', 2004, null, 'Warszawa'],
    ['Andrzej', 'Bielak', 1998, null, 'Tarnów'],
    ['Franciszek', 'Jurczyk', 1990, null, 'Warszawa'],
    ['Eryk', 'Ziobro', 2001, null, 'Katowice'],
    ['Olga', 'Kosner', 2000, null, 'Dąbrowa Górnicza'],
    ['Dariusz', 'Pawdel', 1997, null, 'Kraków'],
    ['Beata', 'Sikora', 1988, null, 'Oświecim'],
    ['Paweł', 'Kozioł', 1999, null, 'Katowice'],
    ['Natalia', 'Bierut', 2001, null, 'Kraków'],
    ['Kinga', 'Pilch', 2002, null, 'Kraków'],
    ['Marcin', 'Długas', 1995, null, 'Poznań'],
    ['Zeta', 'Kuźniak', 2001, null, 'Katowice'],
    ['Kinga', 'Adamowicz', 1999, null, 'Bytom'],
    ['Stanisław', 'Skotniczny', 1996, null, 'Kraków'],
    ['Filip', 'Wedel', 1993, null, 'Katowice'],
    ['Anna', 'Nowak', 2000, null, 'Łódź'],
    ['Robert', 'Lewandowski', 1988, null, 'Warszawa'],
    ['Julia', 'Kowal', 1995, null, 'Gdańsk'],
    ['Michał', 'Wiśniewski', 1992, null, 'Wrocław']
].map(([firstName, lastName, yearOfBirth, age, city]) => [
    firstName, lastName, yearOfBirth, calculateAge(yearOfBirth), city
]);
