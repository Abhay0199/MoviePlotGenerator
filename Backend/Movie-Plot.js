const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 2410;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

const apiKey = process.env.OPENAI_API_KEY;

app.post('/api/movie-plot', async (req, res) => {
    console.log('Received request for movie plot');
    const { movieName } = req.body;

    if (!movieName) {
        return res.status(400).json({ error: 'Movie name is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Provide a plot for movie ${movieName} in 100 words.` }
                ],
                max_tokens: 100
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        const plot = response.data.choices[0].message.content.trim();
        res.json({ plot });
    } catch (error) {
        console.error('Error querying OpenAI:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('Request data:', error.request);
            res.status(500).json({ error: 'No response received from OpenAI' });
        } else {
            console.error('Error message:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Node app listening on port ${port}!`);
});
