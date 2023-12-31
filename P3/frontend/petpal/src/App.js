import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserData } from './contexts/AuthContext'
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
import HomeSeeker from './pages/Home/seeker';
import NotiList from './pages/NotiList';
import NotiPage from './pages/NotiPage';
import SeekerProfile from './pages/SeekerProfile';
import SeekerEdit from './pages/SeekerEdit';
import ShelterDetail from './pages/ShelterDetail';
import ShelterProfile from './pages/ShelterProfile';
import ShelterEdit from './pages/ShelterEdit';
import ReviewList from './pages/ReviewList';
import ReviewDetial from './pages/ReviewDetail';
import ChatPage from './pages/chat';

import ListAllPets from './pages/ShelterAllPet';
import ShelterList from './pages/ShelterList';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogList from './pages/BlogList';
import ViewBlog from './pages/ViewBlog';
import NotFound from './pages/NotFound';


function Webpages(){
  const [userType, setUserType] = useState(null);
  const {token} = useUserData();
  useEffect(() => {
    async function fetchUserType(token) {
      try {
        const userTypeRes = await fetch(`http://localhost:8000/account/usertype/`, {
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

  const CustomLayout = userType === 'shelter' ? LayoutShelter : LayoutSeeker;

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      {/* <Route path ="petDetail" element={<PetDetails />}/> */}
      {/* <Route path ="ShelterManage" element={<ShelterMag />}/>  */}
      {/* <Route path ="PetSearch/" element={<PetSearch />}/>
    {/* <Route path = "application" element={<PetDetails />}/> */}
    </Route>

    <Route path="/">
      <Route path="RegisterSeeker" element={<RegisterSeeker />}/>
      <Route path="RegisterShelter" element={<RegisterShelter />}/>
      <Route path="LoginSeeker" element={<LoginSeeker />} />
      <Route path="LoginShelter" element={<LoginShelter />}/>
      {/* <Route path="HomeSeeker" element={<HomeSeeker />}/> */}
    </Route>

    <Route path="/" element={<LayoutSeeker />}> 
      <Route path="HomeSeeker" element={<HomeSeeker />}/>
      <Route path="ShelterList" element={<ShelterList />}/>
      
      <Route path="SeekerProfile" element={<SeekerProfile />}/>
      <Route path="SeekerEdit" element={<SeekerEdit />}/>
      <Route path="ShelterDetail/:shelter_id" element={<ShelterDetail />}/>

      <Route path="PetSearch" element={<Search />}/>

      <Route path="shelter/:shelter_id/ListBlog" element={<BlogList />} />
    </Route>

    <Route path="/" element={<LayoutShelter />}>
      <Route path="HomeShelter" element={<Home />} />
      <Route path="ShelterManage" element={<ShelterMag />}/>
      <Route path="ShelterProfile" element={<ShelterProfile />}/>
      <Route path="ShelterEdit" element={<ShelterEdit />}/>
      <Route path="PetCreate" element={<PetCreate />}/>
      <Route path="ShelterAllPet" element={<ListAllPets />}/>
      <Route path="CreateBlog" element={<CreateBlog />} />
      <Route path="EditBlog" element={<EditBlog />} />
      <Route path="ListBlog" element={<BlogList />} />

    </Route>

    <Route path="/" element={<LayoutSeeker />}>       
      <Route path="IntroApplication" element={<IntroApplication />} />
      <Route path="CreateApplication" element={<CreateApplication />} />
      <Route path="ReviewApplication" element={<ReviewApplication />} />
      
    </Route>

    <Route path="/" element={<CustomLayout />}>
      <Route path="ListApplication" element={<ListApplication />} />
      <Route path="ApplicationDetail/:application_id" element={<ApplicationDetail />} />
      <Route path="Chat/:application_id" element={<ChatPage />} />
      <Route path="PetDetail" element={<PetDetails />}/>
      <Route path="ViewBlog" element={<ViewBlog />} />  
      <Route path="ReviewList/:shelter_id" element={<ReviewList />}/>
      <Route path="ReviewList/:shelter_id/Review/:review_id" element={<ReviewDetial />} />
      <Route path="NotiList" element={<NotiList />}/>
      <Route path="NotiList/Noti/:noti_id" element={<NotiPage />}/>
    </Route>
    <Route path="*" element={<NotFound />} />
  
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
