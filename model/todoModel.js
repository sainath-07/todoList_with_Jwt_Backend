const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userdetail: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Userdetail'
        }
});

// Collection name: TodoList
const TodoList = mongoose.model('TodoList', todoListSchema);
module.exports = TodoList;
