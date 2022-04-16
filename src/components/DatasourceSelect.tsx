import React, { useState, useEffect, useRef } from "react";
import { getDatasourceList } from "../services/api";

export const DatasourceSelect = ({ onChangeHandler }: { onChangeHandler: React.ChangeEventHandler }) => {
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
        <div className=" border-2 border-emerald-600">
            <label htmlFor="srclist">Choose a Datasource:</label>
            <select ref={selectEl} multiple id="srcList" onChange={onChangeHandler}>
                {sourceList?.map((f, i) => (
                    <option value={f} key={i}>{f}</option>
                ))}
            </select>
            <button onClick={reset}>reset</button>
        </div>
    );
}