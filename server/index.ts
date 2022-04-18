import express from 'express';
import cors from 'cors';
import csvtojson from 'csvtojson';
import _ from 'lodash';

// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());


// Endpoint for the data with filtering
app.get('/', async (req, res) => {
    const converted = await csvtojson().fromFile('data.csv');
    const datasource = req.query.datasource || undefined;
    const campaign = req.query.campaign || 'All';

    let data = [];

    // first filter datasource
    if (datasource && typeof datasource === "string") {
        const dataSourceArray = datasource.split(",");
        for (let i = 0; i < dataSourceArray.length; i++) {
            const j = converted.filter(d => d.Datasource.includes(dataSourceArray[i]));
            data = [...data, ...j]
        }
    } else {
        data = converted;
    }

    // second filter campaign
    if (campaign !== 'All') {
        data = data.filter(c => c.Campaign.includes(campaign));
    }

    // Limit data
    res.send(data);
});

// get list of available datasources
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

// get list of available campaigns
app.get('/campaign', async (req, res, next) => {
    try {
        const converted = await csvtojson().fromFile('data.csv');
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

        const grouped = _.groupBy(mapped, 'Campaign');
        const keysOnly = Object.keys(grouped).sort();
        keysOnly.splice(0, 1)

        res.send(keysOnly);
    } catch (error) {
        next(error);
    }
});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));