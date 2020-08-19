const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const { project } = req.body;
        const projectExists = await Project.findById(project);
        if(!projectExists){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        if(projectExists.owner.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }
        const task = new Task(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.getProjectTasks = async (req, res) => {

    try {
        const { project } = req.body;
        const projectExists = await Project.findById(project);
        if(!projectExists){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        if(projectExists.owner.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        const tasks = await Task.find({ project });
        res.json({tasks});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, status } = req.body;
        const projectExists = await Project.findById(project);
        let taskExists = await Task.findById(req.params.id);
        if(!taskExists){
            return res.status(404).json({msg: 'Tarea no encontrada'})
        }
        if(projectExists.owner.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        const newTask = {};
        if(name) newTask.name = name;
        if(status) newTask.status = status;

        taskExists = await Task.findOneAndUpdate({_id: req.params.id}, newTask, { new: true});
        res.json({taskExists});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.body;
        const projectExists = await Project.findById(project);
        let taskExists = await Task.findById(req.params.id);
        if(!taskExists){
            return res.status(404).json({msg: 'Tarea no encontrada'})
        }
        if(projectExists.owner.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        taskExists = await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}