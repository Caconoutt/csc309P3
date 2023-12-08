import { useEffect, useState } from "react"
import { useUserData } from "../../contexts/AuthContext"
import './style.css';

const ShelterList = () =>{
    const [shelters, setShelters] = useState()
    const {token} = useUserData()

    useEffect(()=>{
        
        const fetchShelterList = async()=>{
            
            try{
                const resp = await fetch(`http://localhost:8000/account/shelter/list/`,{
                    method: "GET",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (resp.ok){
                    const res = await resp.json()
                    setShelters(res)
                    
                }
                else{
                    console.log('error happend')
                }
            }
            catch(error){
                console.error(error)
            }
        };
        fetchShelterList();
    },[]);


    return <>
    <div className="shelter-list">
             {shelters && 
            shelters.map(shelter => (
                <div key={shelter.id} className="shelter-card">
                    <h3>{shelter.username}</h3>

                    <div className="buttons">
                        <button className="details-button">Details</button>
                    </div>
                </div>
            ))} 
        </div>
    </>


}

export default ShelterList