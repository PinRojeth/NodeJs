const { raw, json } = require('body-parser');
const express = require('express');
const app = express();

const fs = require('fs');
const todoList = require('./todoList.json');

app.use(express.json());


app.get('/todolist', (req, res) => {
    res.send(todoList);
})

app.get('/todolist/:id', (req, res) => {
    const todoId = todoList.todoList[req.params.id];
    const todo = todoList.find((todoList) => todoList.id == todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.json({message: `item ${todoId} doesn't exist`})
    }
});


app.post('/addTask', (req, res) => {
    let create = req.body;
    let id = create.id;

    let rawData = fs.readFileSync('./todoList.json');
    let jsonData = JSON.parse(rawData)


    for (let i = 0; i < jsonData.todoList.length; i++) {
            jsonData.todoList[i].id++;
    }


    for (let i = 1; i < jsonData.todoList.length; i++) {
        let ids = jsonData.todoList[i].id;
        if (ids === id) {
            return res.json({message: `This ID is already exited`})
        }
    }

    if (id < 0) {
        res.json({message: "TodoList is not successfully"});
    } else {
        jsonData.todoList.push(create);
    }
 
    
    let createdTodolist = JSON.stringify(jsonData, null , 2);
    fs.writeFileSync('./todoList.json', createdTodolist);

    res.json({message: "TodoList is successfully created"});
})



app.post('/updateTask/:id', (req, res) => {
    let create = req.body;
    let id = req.params.id;

    let rawData = fs.readFileSync('./todoList.json');
    let jsonData = JSON.parse(rawData);

    const index = jsonData.todoList.findIndex((todoList) => todoList.id == id);

    
    if (index === -1) {
        res.status(404).send({error: `User with ID ${id} not found`});
    }
    
    if (create.id > 0) {
        jsonData.todoList[index] = create;
    } else {
        res.status(404).send({error: `You cannot set ID lower than 1`});
    }
    
    const updatedTodolist = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync('./todoList.json', updatedTodolist);
        res.json({Data: `User with ID ${id} updated successfully`});
})



app.post('/deleteTask/:id', (req, res) => {
    let id = parseInt(req.params.id);

    const rawData = fs.readFileSync('./todoList.json');
    const jsonData = JSON.parse(rawData);

    
    const filteredData = jsonData.todoList.filter(todoList => todoList.id != id);

    if (filteredData.length < jsonData.todoList.length) {
        jsonData.todoList = filteredData;

        res.json({message: `User with ID ${id} deleted successfully`});
    } else {

        res.status(404).send({error: `User with ID ${id} is not founded`});
    }

    const deleteDataTodoList = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('./todoList.json', deleteDataTodoList);

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));