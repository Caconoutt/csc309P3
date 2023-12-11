import React, { useEffect } from 'react'
import Review from '../Review'

const SingleReview = ({detail, reviewer_id}) =>{
    console.log("in review" + reviewer_id)

    useEffect(()=>{

    });
    return <>
    <div class="conta">
        <p>{"From " + reviewer_id + " : " + detail}</p>
    </div>
    
    </>
}

export default SingleReview