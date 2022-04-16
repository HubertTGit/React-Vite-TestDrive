import React, { useEffect, useState } from "react";
import { getCampainList } from './../services/api';

export const CampaignSelect = ({ onChangeHandler }: { onChangeHandler: React.ChangeEventHandler }) => {

    const [campaignList, setCampaignList] = useState<string[] | undefined>([]);

    useEffect(() => {
        campaignSource();
    }, []);

    const campaignSource = async () => {
        const response = await getCampainList();
        setCampaignList(response);
    };

    return (
        <div className=" border-2 border-cyan-700">
            <label htmlFor="cmpList">Choose campain:</label>
            <select id="cmpList" onChange={onChangeHandler}>
                <option value={undefined} key="none">all</option>
                {campaignList?.map((f, i) => (
                    <option value={f} key={i}>{f}</option>
                ))}
            </select>
            <button>reset</button>
        </div>
    );
}