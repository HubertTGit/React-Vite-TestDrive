import { useEffect, useState } from "react"

export const Filter = () => {
    const [sourceList, setSourceList] = useState([]);

    useEffect(() => {

    }, []);



    return (
        <div className=" w-1/3 flex-auto border border-red-300">

            <h3>Filter</h3>
            <div>
                <label>Choose a Datasource:</label>
                <select name="cars" multiple>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>



        </div>
    )
}