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
import { groupBy, values, meanBy } from 'lodash';
import * as dayJs from "dayjs";

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




export const Chart = () => {

    const [datas, setData] = useState<IData[]>([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async () => {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ limit: "5000" })
        );
        const data: IData[] = await response.json();
        const mapped = data.map(f => {
            f.Clicks = Math.trunc(+f.Clicks);
            f.Impressions = Math.trunc(+f.Impressions);
            return f;
        });

        setData(mapped);
    };

    const grouped = groupBy(datas, 'Date');
    const labels = Object.keys(grouped) as string[];
    const arrayValues = values(grouped);
    // const formattedDates = labels.map(d => dayJs(d).format('D MMM YYYY'))


    const clicksAv = arrayValues.map(f => meanBy(f, "Clicks"));
    const impressionsAv = arrayValues.map(f => meanBy(f, "Impressions"));

    console.log(labels);
    console.log(clicksAv);
    console.log(impressionsAv);



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