import { useUserData } from '../../contexts/AuthContext';
import './style.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from '../../components/Reviews';


const ReviewList = () =>{

    const [reviewList, setReviewList] = useState(null);
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    const {token} = useUserData();    
    const { shelter_id } = useParams();


    useEffect(()=>{
        const url = `http://localhost:8000/comment/reviews/${shelter_id}/`;
        const fetchReview = async()=>{
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
                    setReviewList(result.results);
                    
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){console.error(error)}
        };
        fetchReview();
    },[filter,sort_time]);

    console.log(reviewList)


    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">

    <div class="main-wrap" id="overwrite_main-wrap">
    <h2>Review List:</h2>
    <Reviews data={reviewList} />
    </div>
    
    
    </main></div>
    </>
    
}

export default ReviewList