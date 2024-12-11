import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
