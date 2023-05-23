import Registration from './pages/RegisterInmates'
import SearchInmate from './pages/RetrieveInmates'
import UpdateAndDeleteInmate from './pages/InmateUpdateWithDelete'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<SearchInmate />} />
        <Route path='/RegisterInmates' element={<Registration />} />
        <Route path='/InmateUpdateWithDelete' element={<UpdateAndDeleteInmate />} />

      </Routes>

    </>
  );
}

export default App;
