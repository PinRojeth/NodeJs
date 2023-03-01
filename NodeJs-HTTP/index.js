const http = require('http');
const path = require('path');
const fs = require('fs');
const { text } = require('stream/consumers');

const server = http.createServer((request, response) => {
    if (request.url === '/') {

        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content ) => {
            if (err) throw err;
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.end(content);
        });
    }

    if (request.url === '/api/users') {
        const users= [
            {name : 'Samnang', age : 21},
            {name : 'Mana', age : 21},
            {name : 'Rojeth', age : 20}
        ];
        response.writeHead(200, {'COntent-Type': 'application/json'});
        response.end(JSON.stringify(users));
    }

    // Build File path
    
    // let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
    
    // // Extension of file
    // let extname = path.extname(filePath);

    // // Intial content type
    // let contentType = 'text/html';

    // // Check ext and set content type
    // switch(extname) {
    //     case '.js' :
    //         contentType = 'text/javascript';
    //         break;
    //     case '.css':
    //         contentType = 'text/css';
    //         break;
    //     case '.json':
    //         contentType = 'application/json';
    //         break;
    //     case '.png':
    //         contentType = 'image/png';
    //         break;
    //     case '.jpg':
    //         contentType = 'image/jpg';
    //         break;
    // }

    // // Read File
    // fs.readFile(filePath, (err, content) => {
    //     if (err) {
    //         if (err.code == 'ENOENT') {
    //             // page not found
    //             fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
    //                 response.writeHead(200, {'Content-Type' : 'text/html'});
    //                 response.end(content, 'utf8');
    //             })
    //         } else {
    //             // Some server error
    //             response.writeHead(500);
    //             response.end(`Server Error: ${err.code}`);
    //         }
    //     } else {
    //         // Success
    //         response.writeHead(200, {'Content-Type': contentType});
    //         response.end(content, 'utf8');
    //     }
    // })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
