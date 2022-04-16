import React, { useState, useEffect } from "react";
import { getDatasourceList } from "../services/api";

export const DatasourceSelect = ({ onChangeHandler }: { onChangeHandler: React.ChangeEventHandler }) => {
    const [sourceList, setSourceList] = useState<string[] | undefined>([]);

    useEffect(() => {
        listSource();
    }, []);

    const listSource = async () => {
        const response = await getDatasourceList();
        setSourceList(response);
    };


    return (
        <div className=" border-2 border-emerald-600">
            <label htmlFor="srclist">Choose a Datasource:</label>
            <select multiple id="srcList" onChange={onChangeHandler}>
                <option value={undefined} key="all">all</option>
                {sourceList?.map((f, i) => (
                    <option value={f} key={i}>{f}</option>
                ))}
            </select>
            <button>reset</button>
        </div>
    );
}