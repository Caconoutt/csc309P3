import { Outlet, Link, useLocation } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import { useState } from "react"
import { useUserData } from "../../contexts/AuthContext"




const LoginSeeker = () => {
    const [username, setUsername] = useState("");
    const [password, setPw] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {token, setToken} = useUserData();
    const [userType, setUserType] = useState(null);


    const logIn = async() => {
        if (username === "" || password === ""){
            setErrorMsg("Error Messages: All fields are required.");
            return
        }

        const userData = {'username':username, 'password':password};
        try{
            const resp = await fetch("http://localhost:8000/account/token/",{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(userData),
                // mode: 'CORS',
            });
            
            const new_resp = await resp.json();
            if (!resp.ok){
                if ((await resp).status === 401){
                    setErrorMsg("Error Messages: " + new_resp.detail);
                    console.log(new_resp.detail);
                    return;
                } 
                const allError = Object.values(new_resp);
                setErrorMsg("Error Messages: " + allError);
            }
            else{
                
                setToken(new_resp.access);
                localStorage.setItem('token', new_resp.access);
                const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!userTypeRes.ok) throw new Error('Error fetching user type');
                const userTypeJson = await userTypeRes.json();
                setUserType(userTypeJson.user_type);

                
                if (userType === 'shelter'){setErrorMsg(
                    "You are not authorized to access this page as a shelter."
                    );
                }
                else{
                    window.location.href = "/HomeSeeker";
                }
                
        }
    }
                
            


        catch (error) {
            console.error("Error:", error);
        }


    }
    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">
        <div className="intro">

        <img className="mb-4" src={logo1} alt="" height="40" />
        <img className="mb-4" src={logo} alt="" height="40" />
        <h1 className="h3 mb-3 fw-normal">Welcome back, pet seeker!</h1>
        </div>

        
        <div id="showOne">
            
            <div className="form-floating">
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" id="loginUser" placeholder="Username" />
                <label for="placeholder">Username</label>
            </div>
            <div className="form-floating">
                <input value={password} onChange={e=>{setPw(e.target.value)}} type="password" className="form-control" id="loginPw" placeholder="Password" />
                <label for="placeholder">Password</label>
            </div>
            
            <div className="text-start">
            <span id="errorMsg">{errorMsg}</span>
            </div>

            <div class="text-end">
            <label><Link to="/RegisterSeeker" className="signup"><span className="signup">Sign up</span></Link></label>
            </div>

         
            <button onClick={logIn} className="btn btnStyle w-100 py-2" type="submit">Log in Meow</button>
            

        </div>
        </main>
        </div>

    
    </>
}

export default LoginSeeker