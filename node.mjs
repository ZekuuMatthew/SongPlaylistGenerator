import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to generate a playlist based on a mood or activity
app.post('/generatePlaylist', async (req, res) => {
    const { mood } = req.body;

    if (!mood) {
        console.error("No mood provided in the request");
        return res.status(400).json({ error: 'Mood or activity is required' });
    }

    console.log("Received mood:", mood);

    exec(`python3 recommendationgetter.py "${mood}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Failed to generate playlist' });
        }
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
        }

        try {
            const data = JSON.parse(stdout);
            if (data.error) {
                console.error(`Error from Python script: ${data.error}`);
                return res.status(500).json({ error: data.error });
            }
            res.json({ playlist: data.playlist });
        } catch (parseError) {
            console.error(`Error parsing Python script output: ${parseError.message}`);
            res.status(500).json({ error: 'Failed to parse playlist' });
        }
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
