import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PetDetails from './pages/PetDetail';
import ShelterMag from './pages/ShelterManage';
import RegisterSeeker from "./pages/RegisterSeeker";
import RegisterShelter from './pages/RegisterShelter';
import LoginSeeker from './pages/LoginSeeker';
import LoginShelter from './pages/LoginShelter';
import LayoutSeeker from './components/LayoutSeeker';
import LayoutShelter from './components/LayoutShelter';
import PetCreate from './pages/PetCreate';
import Search from './pages/PetSearch';
import { UserDataProvider } from './contexts/AuthContext';
import HomeSeeker from './pages/Home/seeker';
import NotiList from './pages/NotiList';
import NotiPage from './pages/NotiPage';
import SeekerProfile from './pages/SeekerProfile';
import ShelterProfile from './pages/ShelterProfile';
import SeekerEdit from './pages/SeekerEdit';
import ShelterEdit from './pages/ShelterEdit';
import ShelterDetail from './pages/ShelterDetail';

function Webpages(){
  return <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/> */}
      {/* <Route path ="petDetail" element={<PetDetails />}/> */}
      {/* <Route path ="ShelterManage" element={<ShelterMag />}/>  */}
      {/* <Route path ="PetSearch/" element={<PetSearch />}/>
    {/* <Route path = "application" element={<PetDetails />}/> */}
  {/* </Route> */}

    <Route path="/">
      <Route path="RegisterSeeker" element={<RegisterSeeker />}/>
      <Route path="RegisterShelter" element={<RegisterShelter />}/>
      <Route path="LoginSeeker" element={<LoginSeeker />} />
      <Route path="LoginShelter" element={<LoginShelter />}/>
      <Route path="PetDetail" element={<PetDetails />}/>
      <Route path="PetCreate" element={<PetCreate />}/>
      <Route path="PetSearch" element={<Search />}/>
      
      {/* <Route path="HomeSeeker" element={<HomeSeeker />}/> */}
    </Route>

    <Route path="/" element={<LayoutSeeker />}> 
      <Route path="HomeSeeker" element={<HomeSeeker />}/>
      <Route path="NotiList" element={<NotiList />}/>
      <Route path="NotiList/Noti/:noti_id" element={<NotiPage />}/>
      <Route path="SeekerProfile" element={<SeekerProfile />}/>
      <Route path="SeekerEdit" element={<SeekerEdit />}/>
      <Route path="ShelterDetail/:shelter_id" element={<ShelterDetail />}/>
    </Route>

    <Route path="/" element={<LayoutShelter />}>
      <Route path="HomeShelter" element={<Home />} />
      <Route path="ShelterManage" element={<ShelterMag />}/> 
      <Route path="ShelterProfile" element={<ShelterProfile />}/>
      <Route path="ShelterNotiList" element={<NotiList />}/>
      <Route path="ShelterNotiList/Noti/:noti_id" element={<NotiPage />}/>
      <Route path="ShelterEdit" element={<ShelterEdit />}/>
      
      {/* <Route path="ListBlog" element={<BlogList />} />   */}
    </Route>
  </Routes>
  </BrowserRouter>;
}

function App(){
  return (
    <UserDataProvider>
      <Webpages />
    </UserDataProvider>
  );
}

export default App;
