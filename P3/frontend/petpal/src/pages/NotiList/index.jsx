import Notis from '../../components/Notis';
import { useUserData } from '../../contexts/AuthContext';
import './style.css'
import { useState, useEffect } from 'react';


const NotiList = () =>{

    const [notiList, setNotiList] = useState(null);
    
    const {token} = useUserData();


    useEffect(()=>{
        
        const fetchNoti = async()=>{
            try{
                const resp = await fetch('http://localhost:8000/account/noti/',{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (resp.ok){
                    const result = await resp.json();
                    setNotiList(result.results)
                    
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){console.error(error)}
        };
        fetchNoti();
    },[]);


    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">

    <div class="main-wrap">
    <h2>Your Messages:</h2>
    <Notis data={notiList} />

    </div>
    
    </main></div>
    </>
    
}

export default NotiList