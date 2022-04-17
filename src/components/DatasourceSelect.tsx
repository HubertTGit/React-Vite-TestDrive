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
            <select ref={selectEl} multiple id="srcList" onChange={onChangeHandler} className="text-sm">
                {sourceList?.map((f, i) => (
                    <option value={f} key={i}>{f}</option>
                ))}
            </select>
            <button onClick={(e) => {
                onResetHandler(e);
                reset();
            }}>reset</button>
        </div>
    );
}