import { UsersRepository } from '../Repositories/user.repository.js'

export class UsersController {
    static instance
    constructor() {
        this.repository = new UsersRepository();
    }

    geAllUsers = async (req, res) => {
        const allUsers = await this.repository.geAllUsers();
        return res.json(allUsers);
    }

    getUser = async (req, res) => {
        const id = Number(req.user.userId);
        const user = await this.repository.getUser(id);
        return res.json(user);
    }

    createUser = async (req, res) => {
        const User = req.body;

        const cratedUser = await this.repository.createUser(User);

        return res.json(cratedUser);
    }

    updateUser = async (req, res) => {
        const id = Number(req.user.userId);
        const user = req.body;

        const userUpdated = await this.repository.updateUser(id, { ...user });

        return res.json(userUpdated);
    }

    deleteUser = async (req, res) => {
        const id = Number(req.params.id);
    
        await this.repository.deleteUser(id);

        return res.json({ ok: true });
    }
}