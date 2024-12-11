import bcrypt from 'bcryptjs';

let users = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}