import React from 'react';
import Review from '../Review';

const Reviews = ({data}) =>{

    return (
        <>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => {
              console.log(item.id);
              return (
                <React.Fragment key={item.id}>
                  <Review detail={item.detail} review_id={item.id} />
                  {console.log(item.detail)}
                </React.Fragment>
              );
            })
          ) : (
            <p>No Review available</p>
          )}
        </>
      );
    };

export default Reviews