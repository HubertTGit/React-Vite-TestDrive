import { useEffect, useState } from 'react'
import { Chart } from './components/Chart'
import { Filter } from './components/Filter'
import { IData } from './interfaces/data.model'
import { getMetrics } from './services/api'

function App() {
  const [metrics, setData] = useState<IData[]>([]);

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ limit: "500" })
    );
    const data: IData[] = await response.json();
    const mapped = data.map(f => {
      f.Clicks = +f.Clicks
      f.Impressions = +f.Impressions
      return f;
    });

    setData(mapped);
  };


  return (
    <main className='grid place-items-center'>
      <div className='flex items-center justify-center container h-screen border-blue-900 border-4'>
        <Filter></Filter>
        <Chart metrics={metrics}></Chart>
      </div>
    </main>
  )
}


export default App
