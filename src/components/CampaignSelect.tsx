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
        <div className=" pt-5">
            <label htmlFor="cmpList" className="block pb-1">Choose campain:</label>
            <select id="cmpList" onChange={onChangeHandler}>
                <option key="all">All</option>
                {campaignList?.map((f, i) => (
                    <option value={f} key={i}>{f}</option>
                ))}
            </select>
        </div>
    );
}