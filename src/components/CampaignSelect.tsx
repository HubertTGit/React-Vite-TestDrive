import React, { useEffect, useRef, useState } from "react";
import { getCampainList } from './../services/api';
import { resetSelection } from "../services/utility";


export const CampaignSelect = ({ onChangeHandler, onResetHandler }: { onChangeHandler: React.ChangeEventHandler, onResetHandler: React.MouseEventHandler }) => {

    const [campaignList, setCampaignList] = useState<string[] | undefined>([]);

    const selectEl = useRef(null);

    useEffect(() => {
        campaignSource();
    }, []);

    const campaignSource = async () => {
        const response = await getCampainList();
        setCampaignList(response);
    };

    return (
        <div className="md:pt-5 md:w-full w-1/2">
            <label htmlFor="cmpList" className="block pb-1">Select Campaign:</label>
            <div className="flex items-center">
                <select ref={selectEl} id="cmpList" onChange={onChangeHandler} className=' w-full rounded-md p-1 dark:text-black'>
                    <option key="all" className=" text-xs">All</option>
                    {campaignList?.map((f, i) => (
                        <option value={f} key={i}>{f}</option>
                    ))}
                </select>
                <button onClick={(e) => {
                    onResetHandler(e);
                    resetSelection(selectEl, 'c');
                }} className=" ml-2 hover:opacity-50" title="reset">
                    <svg viewBox="0 0 512 512" className="h-5 w-5 fill-black dark:fill-white"><path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z" /></svg>
                </button>
            </div>
        </div>
    );
}