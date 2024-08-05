const TodoList = require("../model/todoModel");
const Userdetail = require("../model/userModel");



const addTodo = async (req, res) => {
    const { text } = req.body;

    try {
        // user id
        const usertoken = await Userdetail.findById(req.userId)
        console.log(req.userId, 'req.userId')
        // new ObjectId('66b0757e1be2107826366761') =req.userId
        if (!usertoken) {
            res.status(404).json({ message: "userToken not found" })
        }
        const todolist = new TodoList({
            text,
            userdetail: usertoken._id
        })

        const savedtodolist = await todolist.save()
        res.status(201).json({
            message: 'Todo added successfully',
            todoList: savedtodolist,
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}

const getAllTodo = async (req, res) => {
    try {
        const todo =
            await TodoList.find({ userdetail: req.userId }, { __v: 0 }).populate('userdetail')
        // populate({ path: 'fans', select: 'email' });


        res.status(200).json({
            message: 'All products',
            no_Of_Products: todo.length,
            todo,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        const tododeleted = await TodoList.findByIdAndDelete(
            {
                userdetail: req.userId.toString(),
                _id: todoId
            }
        )
        res.status(200).json({
            message: 'Todo deleted successfully',
            tododeleted,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}

const replaceTodo = async (req, res) => {
    try {
        const { todoId, text } = req.body

        const replacedTodo = await TodoList.findOneAndReplace(
            {
                _id: todoId,
                userdetail: req.userId.toString(),
            },
            {
                text,
                userdetail: req.userId.toString(),
            },
            { new: true }
        )

        res.status(200).json({
            message: 'todo updated',
            replacedTodo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}

module.exports = {
    addTodo, deleteTodo, replaceTodo, getAllTodo
}