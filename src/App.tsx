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

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    getDatas();
  }, [campaign, datasource]);

  useEffect(() => {
    if (mode) {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [mode])

  const getDatas = async () => {
    const response = await getMetrics(datasource, campaign);
    setCount(response?.length!);
    setData(response);
  };

  const campaignSelectionHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _campaign = e.target.value;
    setCampaign(_campaign);
  }

  const datasourceSelectionHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selection = [...options].filter(i => i.selected).map(o => o.value);
    setDataSource(selection.toString());
  }

  const datasourceResetHandler = () => {
    setDataSource(undefined);
  }

  const toggleModeHandler = () => {
    setMode(!mode);
  }

  return (
    <div>
      <Header onToggleHandler={toggleModeHandler} mode={mode}></Header>
      <main className='container mx-auto flex'>
        <Filter>
          <DatasourceSelect onChangeHandler={datasourceSelectionHandler} onResetHandler={datasourceResetHandler} />
          <CampaignSelect onChangeHandler={campaignSelectionHandler} />
        </Filter>
        <Chart metrics={metrics} campaign={campaign} datasource={datasource} count={count} />
      </main>
    </div>
  )
}


export default App
