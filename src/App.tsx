import { useEffect, useState } from 'react';
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

  const { fetchedDatas, search } = useDataSearch();


  return (

    <div>

      <input className='border' type="text" onChange={(e) => search(e.target.value)} placeholder="Search campaign.." /> <label>{fetchedDatas.length} results</label>


      <ul>
        {fetchedDatas.map((datas, index) => (
          <Result key={index} {...datas} />
        ))}

        {fetchedDatas.length === 0 && 'no result'}
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

function useDataSearch() {
  const [fetchedDatas, setfetchedData] = useState<IData[]>([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery') || '';
    search(lastQuery)
  }, []);

  const search = async (q: string) => {

    try {
      const reponse = await fetch("http://localhost:8080?" + new URLSearchParams({ q }));
      const data: IData[] = await reponse.json();

      setfetchedData(data);
      localStorage.setItem('lastQuery', q);
    } catch (error) {
      console.error("ERROR fetching data", error);
    }
  }

  return { fetchedDatas, search }

}

export default App
