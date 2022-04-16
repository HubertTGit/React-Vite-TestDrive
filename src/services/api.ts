import { IData } from "../interfaces/data.model";

// the main data default of 1000 items
export const getMetrics = async (limit = "1000", datasource: string, campaign: string) => {
    try {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ limit, datasource, campaign })
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

// list of available datasources
export const getDatasourceList = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/datasource'
        );
        return response;
    } catch (error) {
        console.error("ERROR fetching data", error)
    }
}


// list of available campaigns
export const getCampainList = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/campaign'
        );
        return response;
    } catch (error) {
        console.error("ERROR fetching data", error)
    }
}