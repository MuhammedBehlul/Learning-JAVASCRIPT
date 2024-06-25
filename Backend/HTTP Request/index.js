import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.send("<h1>Hello World!</h1>");
});

app.get('/about', (req, res) => {
    console.log('About route accessed');
    res.send("Hello My name is Messi");
});

app.get('/contact', (req, res) => {
    console.log('Contact route accessed');
    res.send("Hello My name is Ronaldo");
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port + '.');
});
