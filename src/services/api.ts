import { IData } from "../interfaces/data.model";

// main data data fetch with filtering of datasource and campaign
export const getMetrics = async (datasource = '', campaign = '',) => {
    try {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ datasource, campaign })
        );
        const data: IData[] = await response.json();
        const mapped = data.map(f => {
            f.Clicks = +f.Clicks
            f.Impressions = +f.Impressions
            return f;
        });

        return mapped;
    } catch (error) {
        console.error("ERROR fetching data", error)
    }
}

// list of datasources for selection
export const getDatasourceList = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/datasource'
        );
        const list: string[] = await response.json();
        return list;
    } catch (error) {
        console.error("ERROR fetching data", error)
    }
}


// list of campaigns for selection
export const getCampainList = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/campaign'
        );
        const list: string[] = await response.json();
        return list;
    } catch (error) {
        console.error("ERROR fetching data", error)
    }
}