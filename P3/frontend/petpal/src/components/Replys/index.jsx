import React from 'react';
import Review from '../Review';
import Reply from '../Reply';

const Replys = ({data}) =>{

    return (
        <>
          {Array.isArray(data.results) && data.results.length > 0 ? (
            (data.results).map((item) => {
              console.log(item.id);
              return (
                <React.Fragment key={item.id}>
                  <Reply detail={item.detail} review_id={item.id} />
                  {console.log(item.detail)}
                </React.Fragment>
              );
            })
          ) : (
            <p> No Reply available</p>
          )}
        </>
      );
    };

export default Replys