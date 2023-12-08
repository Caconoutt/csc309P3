import React, { useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useUserData } from '../../contexts/AuthContext'
import SingleReview from '../../components/SingleReview'
import Reviews from '../../components/Reviews';
import Replys from '../../components/Replys';

const ReviewDetail=() =>{
    const {shelter_id, review_id} = useParams();
    const {token} = useUserData()
    const fetchurl = `http://localhost:8000/comment/reviews/${shelter_id}/${review_id}/`;
    const fetchReplyUrl = `http://localhost:8000/comment/reviews/${review_id}/replies/`;
    const [msg, setMsg] = useState('')
    const [replyList, setReplyList] = useState('')
    const [id, setId] = useState('')
    const [reply, setReply] = useState('')


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
                    console.log(result)
                    const {detail,reviewer} = result;
                    setMsg(detail);
                    setId(reviewer);
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){}
        };

        const fetchReply = async()=>{
            try{
                const resp = await fetch(fetchReplyUrl,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (resp.ok){
                    const result = await resp.json();
                    console.log("reply" +result)
                    setReplyList(result);
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){}

        };
        fetchNoti();
        fetchReply();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const new_url = `http://localhost:8000/comment/reviews/${review_id}/replies/`;
        const updatedData = {
            detail: reply,
          // Include other fields that need to be updated
        };
      
        try {
          const response = await fetch(new_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result);
          } else {
            console.log('Error updating review');
          }
        } catch (error) {
          console.error(error);
        }

        
        try{
            const resp = await fetch(fetchReplyUrl,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (resp.ok){
                const result = await resp.json();
                console.log("reply" +result)
                setReplyList(result);
            }
            else{
                console.log('error happend')
            }
        }
        catch(error){}

        // clear the input box
        setReply('');

    };

    const handleInputChange = (event) => {
        // Update the 'reply' state as the textarea value changes
        setReply(event.target.value);
      };
    

    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">

    <div class="main-wrap">
    
    <SingleReview detail={msg} reviewer_id={id}/>
    <Replys data={replyList} />

    {/* input box to enter the review */}
    <div class="container" id="wrap">
        <form>
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Reply:</label>
        <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        value={reply}
        onChange={handleInputChange}
        placeholder="Type your reply..."
      ></textarea>

        </div>
        </form>
    </div>
    {/* submit button */}
    <div class="container" id="wrap">
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Submit Reply</button>
    </div>
    </div>

    <button className="btn btnStyle w-100 py-2" type="submit"><Link to={`/ReviewList/${shelter_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Back to all Review</Link></button>
    
    </main></div>
    </>

}

export default ReviewDetail