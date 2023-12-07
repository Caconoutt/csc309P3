import Noti from '../Noti'
import React from 'react';

const Notis = ({data}) =>{

    return <>
    {data &&
        data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Noti msg={item.msg} noti_id={item.id}/>
              {console.log(item.msg)}
            </React.Fragment>
          );
        })}
    </>
}

export default Notis