import React, { useState, useEffect, useRef } from "react";
import { getDatasourceList } from "../services/api";

export const DatasourceSelect = ({ onChangeHandler, onResetHandler }: { onChangeHandler: React.ChangeEventHandler, onResetHandler: React.MouseEventHandler }) => {
    const [sourceList, setSourceList] = useState<string[] | undefined>([]);

    const selectEl = useRef(null);
    useEffect(() => {
        listSource();
    }, []);

    const listSource = async () => {
        const response = await getDatasourceList();
        setSourceList(response);
    };

    const reset = () => {
        const current = selectEl.current as any;
        current.selectedIndex = -1;
    }


    return (
        <div className="pt-5">
            <label htmlFor="srclist" className="block pb-1">Select a Datasource(s):</label>
            <div className="flex items-end">
                <select ref={selectEl} multiple id="srcList" onChange={onChangeHandler} className="p-1 rounded-md w-full text-sm dark:text-black">
                    {sourceList?.map((f, i) => (
                        <option value={f} key={i}>{f}</option>
                    ))}
                </select>
                <button onClick={(e) => {
                    onResetHandler(e);
                    reset();
                }} className=" ml-2" title="reset">
                    <svg viewBox="0 0 512 512" className="h-5 w-5 fill-black dark:fill-white"><path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z" /></svg>
                </button>
            </div>
        </div>
    );
}