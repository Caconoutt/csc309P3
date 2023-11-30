import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function Webpages(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>

  </Route>
  </Routes>
  </BrowserRouter>
}

function App(){
  return <Webpages />;
}

export default App;
