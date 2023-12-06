import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PetDetails from './pages/PetDetail';
import ShelterMag from './pages/ShelterManage';

function Webpages(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path ="petDetail" element={<PetDetails />}/>
      <Route path ="ShelterManage" element={<ShelterMag />}/>
      <Route path ="PetSearch/" element={<PetSearch />}/>
    {/* <Route path = "application" element={<PetDetails />}/> */}
  </Route>
  </Routes>
  </BrowserRouter>
}

function App(){
  return <Webpages />;
}

export default App;
