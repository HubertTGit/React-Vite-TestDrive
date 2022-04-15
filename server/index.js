import express from 'express';
import cors from 'cors';
import csvtojson from 'csvtojson';
// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());


// Endpoint to search
app.get('', async (req, res) => {
    const converted = await csvtojson().fromFile('data.csv');
    const q = req.query.q?.toLowerCase() || '';
    const data = converted.filter(d => d.Datasource.toLowerCase().includes(q));

    res.send(data);

});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));