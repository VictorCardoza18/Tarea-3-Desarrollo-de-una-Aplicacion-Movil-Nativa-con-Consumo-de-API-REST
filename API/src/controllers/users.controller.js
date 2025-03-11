import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
    try {
        const usuario = await User.find()
        res.json(usuario)
    } catch (error) {
        res.status(404).json(['Cannot get usuarios'])
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id)
        if (!usuario) return res.status(404).json(['Usuario not found'])
        res.json(usuario)
    } catch (error) {
        res.status(404).json(['Cannot get Usuario'])
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id)
        if (!usuario) return res.status(404).json(['Usuario not found'])
        res.status(204).json(['Usuario deleted'])
    } catch (error) {
        res.status(404).json(['Cannot delete usuario'])
    }
}

export const updateUsuario = async (req, res) => {
    try {
        let updatedUser;

        if (req.body.password) {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            updatedUser = {
                username: req.body.username,
                password: passwordHash
            }
        } else
            updatedUser = { username: req.body.username }

        const usuario = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
        if (!usuario) return res.status(404).json(['Usuario not found'])
        res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(404).json(['Cannot update usuario'])
    }
}
