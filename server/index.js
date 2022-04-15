import express from 'express';
import cors from 'cors';
import csvtojson from 'csvtojson';
import _ from 'lodash';
// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());


// Endpoint to search
app.get('/', async (req, res) => {
    const converted = await csvtojson().fromFile('data.csv');
    const q = req.query.q?.toLowerCase() || '';
    const limit = req.query.limit || 1000;
    const dataSource = req.query.dataSource?.toLowerCase() || '';
    const campaign = req.query.campaign?.toLowerCase() || '';
    const data = converted.filter(d => d.Campaign.toLowerCase().includes(q));

    console.log(req.query)
    // Limit to 1000
    res.send(data.slice(0, limit));
});

app.get('/datasource', async (req, res, next) => {
    try {
        const converted = await csvtojson().fromFile('data.csv');
        const grouped = _.groupBy(converted, 'Datasource');
        const keysOnly = Object.keys(grouped).sort();
        res.send(keysOnly);
    } catch (error) {
        next(error);
    }
});

app.get('/campaign', async (req, res, next) => {
    try {
        const converted = await csvtojson().fromFile('data.csv');
        converted.slice(0, 1000);
        const mapped = converted.map(g => {
            let _l = 5;

            const named = g.Campaign;
            if (named.indexOf(" -")) {
                _l = named.indexOf(" -");
            }

            const trimmed = named.substring(0, _l);
            g.Campaign = trimmed

            return g;
        });

        const grouped = _.groupBy(converted, 'Campaign');
        const keysOnly = Object.keys(grouped).sort();
        console.log(keysOnly)

        res.send(keysOnly);
    } catch (error) {
        next(error);
    }
});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));