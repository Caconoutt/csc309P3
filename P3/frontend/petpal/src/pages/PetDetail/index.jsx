import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Table from './Table';

function PetDetails() {
    const [pet, setPet] = useState({});
    const [pet_id] = useState(11);

    useEffect(() => {
        fetch(`/pet/seeker/pets/${pet_id}/`,
        {method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')),
          },
          mode: 'cors',
        }
        )

            .then(response => response.json())
            .then(json => {
                console.log(json);
                setPet(json);
                
            });
    }, [pet_id]);

    return (
        <div>
            <Table pet={pet} />
        </div>
    );
}

export default PetDetails;
