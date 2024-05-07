import { UsersRepository } from '../Repositories/user.repository.js'
import jwt from 'jsonwebtoken'

export class SessionController {
    static instance
    constructor() {
        this.repository = new UsersRepository();
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        const user = await this.repository.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'email or password not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'email or password not found' });
        }

        const token = jwt.sign({
            userId: user.id,
            admin: user.admin,
            email: user.email,
            name: user.name
        }, 'felipe', { expiresIn: '2h' })

        return res.json({ token });
    }
}