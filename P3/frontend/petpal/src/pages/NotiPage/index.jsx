import React, { useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useUserData } from '../../contexts/AuthContext'

import SingleNoti from '../../components/SingleNoti'
import './style.css'


const NotiPage=() =>{
    const {noti_id} = useParams()
    const {token} = useUserData()
    const fetchurl = `http://localhost:8000/account/noti/${noti_id}/`;
    const [msg, setMsg] = useState('')
    const [notiCase, setNotiCase] = useState('')
    const [shelter_id, setShelter_id] = useState('')

    useEffect(()=>{
        
        const fetchNoti = async()=>{
            try{
                
                const resp = await fetch(fetchurl,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (resp.ok){
                    const result = await resp.json();
                    console.log(result);
                    setNotiCase(result.case);
                    setMsg(result.msg);
                    if(result.shelter_id){
                        setShelter_id(result.shelter_id);
                    }
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){}
        };
        fetchNoti();
    },[]);

    const handleNavigate = async () => {
        // if case is review/reply, navigate to shelter page
        // if case is application, navigate to application list
        if (notiCase === 'review' || notiCase === 'reply'){
            window.location.href = `http://localhost:3000/ReviewList/${shelter_id}`;
        }
        else if (notiCase === 'application'){
            window.location.href = "http://localhost:3000/ListApplication";
        }
        else{
            // stay on the same page
            return;
        }
      };
    

    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">

    <div class="main-wrap" id="overwrite_main-wrap">
    
    <SingleNoti msg={msg} />
    <button
            id="goToReview"
            className="btn btnStyle w-100 py-2"
            onClick={handleNavigate}
          >
            Go to Detail
          </button>

    <button id="backToList" className="btn btnStyle w-100 py-2" type="submit"><Link to="/NotiList" style={{ textDecoration: 'none', color: 'inherit' }}>Back to all noti</Link></button>

    </div>

    
    
    </main></div>
    </>

}

export default NotiPage