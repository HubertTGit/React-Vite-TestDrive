import { useState } from 'react';
import { IData } from './interfaces/data.model'

function App() {

  return (
    <main>

      <h1 className="text-3xl font-bold underline text-blue-300">
        Search Stuff
      </h1>

      <SearchBar></SearchBar>
    </main>
  )
}

function SearchBar() {
  const [animal, setAnimal] = useState<IData[]>([]);

  const search = async (val: string) => {

    try {
      const reponse = await fetch("http://localhost:8080?" + new URLSearchParams({ q: val }));
      const data: IData[] = await reponse.json();

      setAnimal(data);
    } catch (error) {
      console.error("ERROR fetching data", error);
    }
  }

  return (

    <div>
      <input className='border' type="text" onChange={(e) => search(e.target.value)} placeholder="Search campaign.." /> <label>{animal.length} results</label>


      <ul>
        {animal.map((datas, index) => (
          <Result key={index} {...datas} />
        ))}

        {animal.length === 0 && 'no result'}
      </ul>
    </div>
  )
}

function Result({ Date, Datasource, Campaign, Impressions }: IData) {
  return (
    <li className=' font-mono text-purple-800'>
      <strong>{Date}</strong> {Datasource} {Campaign} {Impressions}
    </li>
  );
}

export default App
