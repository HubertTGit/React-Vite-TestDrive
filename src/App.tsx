import { useEffect, useState } from 'react'
import { CampaignSelect } from './components/CampaignSelect'
import { Chart } from './components/Chart'
import { DatasourceSelect } from './components/DatasourceSelect'
import { Filter } from './components/Filter'
import { IData } from './interfaces/data.model'
import { getMetrics } from './services/api'

function App() {
  const [metrics, setData] = useState<IData[] | undefined>([]);
  const [campaign, setCampaign] = useState<string>("All");
  const [datasource, setDataSource] = useState<string>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    getDatas();
  }, [campaign, datasource])

  const getDatas = async () => {
    const response = await getMetrics(datasource, campaign);
    setCount(response?.length!);
    setData(response);
  };

  const campaignHandleSelection = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _campaign = e.target.value;
    setCampaign(_campaign);
  }

  const datasourceHandleSelection = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selection = [...options].filter(i => i.selected).map(o => o.value);
    setDataSource(selection.toString());
  }

  return (
    <main className='grid place-items-center'>
      <div className='flex items-center justify-center container h-screen border-blue-900 border-1'>
        <Filter>
          <DatasourceSelect onChangeHandler={datasourceHandleSelection} />
          <CampaignSelect onChangeHandler={campaignHandleSelection} />
        </Filter>
        <Chart metrics={metrics} campaign={campaign} datasource={datasource} count={count} />

      </div>
    </main>
  )
}


export default App
