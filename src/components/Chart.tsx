import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IData } from '../interfaces/data.model';
import { generateRandomNumbers } from './../utilities/utility';
import { groupBy, values, meanBy } from 'lodash';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Data ETL-V',
        },
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export const Chart = () => {

    const [datas, setData] = useState<IData[]>([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async () => {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ q: 'africa' })
        );
        const data: IData[] = await response.json();
        const mapped = data.map(f => {
            f.Clicks = parseInt(f.Clicks as string);
            f.Impressions = parseInt(f.Impressions as string);
            return f;
        })
        setData(mapped);
    };

    const grouped = groupBy(datas, 'Date');
    const labels = Object.keys(grouped);
    const toArray = values(grouped);



    // put this to utility
    // const clicks = grouped[labels[0]].map(f => { console.log(f) });
    // // const impressions = grouped[labels[0]].flatMap(h => [h.Impressions]);

    const clicksAv = toArray.map(f => meanBy(f, "Clicks"));
    const impressionsAv = toArray.map(f => meanBy(f, "Impressions"))




    const data = {
        labels,
        datasets: [
            {
                label: 'Clicks',
                data: clicksAv,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Impressions',
                data: impressionsAv,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };


    return (
        <div className="w-2/3 flex-auto border">
            <Line options={options} data={data} />
        </div>
    )
}