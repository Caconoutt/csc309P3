import Notis from '../../components/Notis';
import { useUserData } from '../../contexts/AuthContext';
import './style.css'
import { useState, useEffect } from 'react';


const NotiList = () =>{

    const [notiList, setNotiList] = useState(null);
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    const {token} = useUserData();    


    useEffect(()=>{
        const url = `http://localhost:8000/account/noti/?filter=${filter}&order_by=${sort_time}`
        const fetchNoti = async()=>{
            try{
                const resp = await fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (resp.ok){
                    const result = await resp.json();
                    setNotiList(result.results);
                    
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){console.error(error)}
        };
        fetchNoti();
    },[filter,sort_time]);


    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">

    <div class="main-wrap" id="overwrite_main-wrap">
    <h2>Your Messages:</h2>
    <Notis data={notiList} />
    <button onClick={e=>setFilter('readed')} id="filter_readed"className="btn btnStyle w-100 py-2" type="submit">View Read</button>
    <button onClick={e=>setFilter('unreaded')} id="filter_unreaded" className="btn btnStyle w-100 py-2" type="submit">View Unread</button>
    <button onClick={e=>setSort('created_time')} id="sort_time" className="btn btnStyle w-100 py-2" type="submit">View by Time</button>
    </div>
    
    
    </main></div>
    </>
    
}

export default NotiList