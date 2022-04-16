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
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Data ETL-V',
        },
    },
};


// TODO: cast the correct model
export const Chart = ({ metrics }) => {

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
        <div className="w-2/3 flex-auto border">
            <Line options={options} data={data} />
        </div>
    )
}