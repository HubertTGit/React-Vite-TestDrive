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
import { Line } from 'react-chartjs-2';
import { IData } from '../interfaces/data.model';
import { generateLabels, generateClicksAverageValue, generateImpressionsAverageValue } from "./../services/utility"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Set chart options
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: false,
            text: 'Data ETL-V',
        },
    },
};


export const Chart = ({ metrics, campaign, datasource, count }: { metrics: IData[] | undefined, campaign: string | undefined, datasource: string | undefined, count: number }) => {

    const labels = generateLabels(metrics);
    const clicksAv = generateClicksAverageValue(metrics);
    const impressionsAv = generateImpressionsAverageValue(metrics);

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
        <div className="flex-auto w-3/4 p-5">
            <div className=' flex justify-between text-xs pb-3'>
                <div className='w-1/3'><span className=' font-semibold'>Datasource(s):</span>  {datasource ? datasource : 'All'}</div>
                <div className='w-1/3 text-center'><span className=' font-semibold'>Campaign:</span> {campaign}</div>
                <div className='w-1/3 text-right'><span className=' font-semibold'>Records:</span> {count}</div>
            </div>
            <Line options={options} data={data} />
        </div>
    )
}