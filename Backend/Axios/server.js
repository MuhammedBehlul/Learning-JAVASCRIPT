import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize express app
const app = express();
const port = 3000;

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Route to fetch data from JSONPlaceholder and render the EJS template
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.render('index', { posts: response.data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
