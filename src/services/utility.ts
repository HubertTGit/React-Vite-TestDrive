import { groupBy, values, meanBy } from 'lodash';
import { IData } from '../interfaces/data.model';


// Generate a random number between min and max
export const generateRandomNumbers = (min: number, max: number) => {
    const lowest = min < 0 ? Math.abs(min) : min;
    const total = (max - min);
    return Array(total).fill(total).map(f => Math.fround(f * Math.random()));
}

// Generates a list of labels for a date.
export const generateLabels = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    return Object.keys(grouped) as string[];
}

// Generates the average value for clicks.
export const generateClicksAverageValue = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    const arrayValues = values(grouped);
    return arrayValues.map(f => Math.round(meanBy(f, "Clicks")));
}

// Returns the average impressions for each date.
export const generateImpressionsAverageValue = (metrics: IData[] | undefined) => {
    const grouped = groupBy(metrics, 'Date');
    const arrayValues = values(grouped);
    return arrayValues.map(f => Math.round(meanBy(f, "Impressions")));
}

// Resets the selection.
export const resetSelection = (s: React.MutableRefObject<null>, type: 'ds' | 'c') => {
    const current = s.current as any;
    if (type === 'ds') {
        current.selectedIndex = -1;
    } else {
        current.selectedIndex = 0;
    }

}





