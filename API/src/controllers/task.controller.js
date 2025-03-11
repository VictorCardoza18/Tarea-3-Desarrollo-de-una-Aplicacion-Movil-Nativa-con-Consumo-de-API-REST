import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(404).json(['Cannot get tasks'])
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, date, user } = req.body
        const newTask = new Task({ title, description, date, user })
        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (error) {
        res.status(400).json(['Task not saved'])
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json(['Task not found'])
        res.json(task)
    } catch (error) {
        res.status(404).json(['Task not found'])
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json(['Task not found'])
        res.status(204).json(['Task deleted'])
    } catch (error) {
        res.status(404).json(['Task not found'])
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json(['Task not found'])
        res.json(task)
    } catch (error) {
        res.status(404).json(['Task not found'])
    }
}
