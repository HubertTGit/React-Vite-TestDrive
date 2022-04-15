import { Chart } from './components/Chart'
import { Filter } from './components/Filter'
import { IData } from './interfaces/data.model'

function App() {



  return (
    <main className='grid place-items-center'>
      <div className='flex items-center justify-center container h-screen border-blue-900 border-4'>
        <Filter></Filter>
        <Chart></Chart>
      </div>
    </main>
  )
}


export default App
