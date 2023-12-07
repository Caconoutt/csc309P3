import { useUserData } from "../../contexts/AuthContext"
import Dropdown from 'react-bootstrap/Dropdown';

const Logout = () =>{
    const {token, setToken } = useUserData();
    console.log(token)

    const handleLogout = async() =>{
        
        try{
            const resp = fetch("http://localhost:8000/account/logout/",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
            });
            const new_resp = await resp;
            if (new_resp.status === 200) {
                // Successful logout
                console.log('User logged out successfully');
                setToken("");
                localStorage.setItem('token', '');
                window.location.href = "/";
              } else {
                console.log('fail to logout');
                
              }
        }
        catch(error){
            console.error("Error: ", error);
        }
    }

    return(
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    );
}

export default Logout