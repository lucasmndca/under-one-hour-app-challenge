const Todo = require('../models/Todo')

const findAll = async () => {
    return await Todo.find()
} 

const create = async ({name, desc}) => {
    return await Todo.create({name, desc, timestamp: new Date()})
} 

const remove = async (_id) => {
    return await Todo.deleteOne({_id})
}

module.exports = {
    findAll,
    create,
    remove
}