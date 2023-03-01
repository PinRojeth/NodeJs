const { strict } = require('assert');
const { raw, json } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const data = require('./users.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Request API</h1>');
})

app.get('/api/users', (req, res) => {
    res.send(data);
})

app.get('/api/users/:id', (req, res) => {
    let userID = data.data[req.params.id];
    res.send({"Data" : userID});
})

app.post('/api/users', (req, res) => {
    let user = req.body;

    let rawData = fs.readFileSync('./users.json');
    let jsonData = JSON.parse(rawData);

    jsonData.data.push(user);
    
    const createJsonData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync("./users.json", createJsonData);

    res.json({message: `Data added successfully`});
})

app.put('/api/users/:id', (req, res) => {
    let {email, first_name, last_name, avatar} = req.body;
    let id = req.params.id;

    let rawData = fs.readFileSync('./users.json');
    let jsonData = JSON.parse(rawData);

    const dataIndex = jsonData.data.findIndex((data) =>  data.id == id);
    if(dataIndex === -1) {
        res.status(404).send({error: `Data with ID ${id} not found`});
    }
    jsonData.data[dataIndex] = {email, first_name, last_name, avatar};

    const updateJson = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync("./users.json", updateJson);

    res.json({message: `Data updated successfully`});
})



app.delete('/api/users/:id', (req, res) => {
    let userId = parseInt(req.params.id);

    const filteredData = data.data.filter(data => data.id != userId);

    if (filteredData.length < data.data.length) {
        data.data = filteredData;
        res.json({message: `User with ID ${userId} deleted successfully`});
    } else {
        res.status(404).send({error: `User with ID ${userId} is not founded`})
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));