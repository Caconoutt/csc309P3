import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import IntroApplication from './pages/application/IntroApplication';
import CreateApplication from './pages/application/CreateApplication';
import ReviewApplication from './pages/application/ReviewApplication';
import ListApplication from './pages/application/ListApplication';
import ApplicationDetail from './pages/application/ApplicationDetail';
import PetCreate from './pages/PetCreate';
import Search from './pages/PetSearch';
import { UserDataProvider } from './contexts/AuthContext';
import CreateBlog from './pages/CreateBlog';
import HomeSeeker from './pages/Home/seeker';
import EditBlog from './pages/EditBlog';
import BlogList from './pages/BlogList';
import NotiList from './pages/NotiList';
import NotiPage from './pages/NotiPage';
import ViewReview from './pages/ViewReview';
import ListAllPets from './pages/ShelterAllPet';
import EditBlog from './pages/EditBlog';
import BlogList from './pages/BlogList';
import ViewBlog from './pages/ViewBlog';
import NotFound from './pages/NotFound';

function Webpages(){
  const [userType, setUserType] = useState(null);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    async function fetchUserType(token) {
      try {
        const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        
        if (!userTypeRes.ok) {
          throw new Error(`HTTP error! status: ${userTypeRes.status}`);
        }
        const userTypeData = await userTypeRes.json();
        return userTypeData.user_type;
      } catch (error) {
        console.error('Error fetching user type:', error);
        return null;
      }
    }

    fetchUserType(token).then(fetchedUserType => {
      setUserType(fetchedUserType);
    });
  }, [token]);

  const Layout = userType === 'shelter' ? LayoutShelter : LayoutSeeker;


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
      <Route path="ShelterAllPet" element={<ListAllPets />}/>
      {/* <Route path="HomeSeeker" element={<HomeSeeker />}/> */}
    </Route>

    <Route path="/" element={<LayoutSeeker />}> 
      <Route path="HomeSeeker" element={<HomeSeeker />}/>
      <Route path="NotiList" element={<NotiList />}/>
      <Route path="NotiList/Noti/:noti_id" element={<NotiPage />}/>
    </Route>

    <Route path="/" element={<LayoutShelter />}>
      <Route path="HomeShelter" element={<Home />} />
      <Route path="CreateBlog" element={<CreateBlog />} />
      <Route path="ListBlog" element={<BlogList />} />      
      <Route path="ShelterManage" element={<ShelterMag />}/> 
      <Route path="EditBlog" element={<EditBlog />} />
      <Route path="ViewBlog" element={<ViewBlog />} />
      
    </Route>
   

    <Route path="/" element={<Layout />}>
      <Route path="IntroApplication" element={<IntroApplication />} />
      <Route path="CreateApplication" element={<CreateApplication />} />
      <Route path="ReviewApplication" element={<ReviewApplication />} />
      <Route path="ListApplication" element={<ListApplication />} />
      <Route path="ApplicationDetail/:application_id" element={<ApplicationDetail />} />
    </Route>
    <Route path='*' element={<NotFound />} />
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
