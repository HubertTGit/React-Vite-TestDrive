import { useEffect, useState } from 'react'
import { CampaignSelect } from './components/CampaignSelect'
import { Chart } from './components/Chart'
import { DatasourceSelect } from './components/DatasourceSelect'
import { Filter } from './components/Filter'
import { Header } from './components/Header'
import { IData } from './interfaces/data.model'
import { getMetrics } from './services/api'

function App() {
  const [metrics, setData] = useState<IData[] | undefined>([]);
  const [campaign, setCampaign] = useState<string>("All");
  const [datasource, setDataSource] = useState<string>();
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<boolean>(false);

  // Use effect to get datas on component mount
  useEffect(() => {
    getDatas();
  }, []);

  // Use effect to get datas based on campaign and datasource changes
  useEffect(() => {
    getDatas();
  }, [campaign, datasource]);

  // Use effect if mode is true or false
  useEffect(() => {
    if (mode) {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [mode])

  // Get metrics with filter.
  const getDatas = async () => {
    const response = await getMetrics(datasource, campaign);
    setCount(response?.length!);
    setData(response);
  };

  // Handler for campaign HTMLSelectionHandler.
  const campaignSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _campaign = e.target.value;
    setCampaign(_campaign);
  }

  // Handler for datacource HTMLSelectionHandler.
  const datasourceSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selection = [...options].filter(i => i.selected).map(o => o.value);
    setDataSource(selection.toString());
  }

  // Resets the datasource to undefined.
  const datasourceResetHandler = () => {
    setDataSource(undefined);
  }

  // Reset campaign.
  const campaignResetHandler = () => {
    setCampaign('All');
  }

  // Toggle mode.
  const toggleModeHandler = () => {
    setMode(!mode);
  }

  return (
    <div className='font-mono h-screen bg-slate-200 dark:bg-slate-700 dark:text-white'>
      <Header onToggleHandler={toggleModeHandler} mode={mode}></Header>
      <main className='flex md:flex-row flex-col'>
        <Filter>
          <DatasourceSelect onChangeHandler={datasourceSelectionHandler} onResetHandler={datasourceResetHandler} />
          <CampaignSelect onChangeHandler={campaignSelectionHandler} onResetHandler={campaignResetHandler} />
        </Filter>
        <Chart metrics={metrics} campaign={campaign} datasource={datasource} count={count} />
      </main>
    </div>
  )
}


export default App
