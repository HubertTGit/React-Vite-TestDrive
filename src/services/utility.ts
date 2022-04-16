import { groupBy, values, meanBy } from 'lodash';
import { IData } from '../interfaces/data.model';

export const generateRandomNumbers = (min: number, max: number) => {
    const lowest = min < 0 ? Math.abs(min) : min;
    const total = (max - min);
    return Array(total).fill(total).map(f => Math.fround(f * Math.random()));
}

export const generateLabels = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    return Object.keys(grouped) as string[];
}

export const generateClicksAverageValue = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    const arrayValues = values(grouped);
    return arrayValues.map(f => Math.round(meanBy(f, "Clicks")));
}

export const generateImpressionsAverageValue = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    const arrayValues = values(grouped);
    return arrayValues.map(f => Math.round(meanBy(f, "Impressions")));
}





