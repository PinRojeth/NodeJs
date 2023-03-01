const http = require('http');

// Create Server object
http.createServer((request, response) => {
    // Write response
    response.write('Hello World');
    response.end();
}).listen(5000, () => console.log('Server is running'));