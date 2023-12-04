import { Outlet, Link, useLocation } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import "../Home/style.css"
import "../LoginSeeker/style.css"
import { useState } from "react"
import { useUserData } from "../../contexts/AuthContext"



const LoginShelter = () => {
    const [username, setUsername] = useState("");
    const [password, setPw] = useState("");
    const [errorMsg, setErrorMsg] =useState("");
    const {token, setToken} = useUserData();
    

    const login = async() =>{
        if (username === "" || password === ""){
            setErrorMsg("Error Messages: All fields are required.");
            return;
        }

        const userData = {'username': username, 'password':password};

        try{
            const resp = await fetch("http://localhost:8000/account/token/", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const new_resp = await resp.json();

            if (!resp.ok){
                if (new_resp.status === 401){
                    setErrorMsg("Error Messages: Unauthorized Action");

                    console.log(new_resp);
                    return;
                }
                
                const allError = Object.values(new_resp);
                setErrorMsg("Error Messages: " + allError);
            }
            else{
                setToken(new_resp.access);
                //console.log(token);
                window.location.href = "/HomeShelter";
            }
        }
        catch(error){
            console.error("Error: ", error);
        }


    }

    

    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">
        <div className="intro">

        <img className="mb-4" src={logo1} alt="" height="40" />
        <img className="mb-4" src={logo} alt="" height="40" />
        <h1 className="h3 mb-3 fw-normal">Welcome back, pet shelter!</h1>
        </div>

        
        <div id="showOne">
            
            <div className="form-floating">
                <input value={username} onChange={e=>setUsername(e.target.value)} type="text" className="form-control" id="loginUsername" placeholder="username" />
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
                <input value={password} onChange={e=>setPw(e.target.value)} type="password" className="form-control" id="loginPw" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>

            <div className="text-start">
            <span id="errorMsg">{errorMsg}</span>
            </div>

            <div class="text-end">
            <label><Link to="/RegisterShelter" className="signup"><span className="signup">Sign up</span></Link></label>
            </div>

         
            <button onClick={login} className="btn btnStyle w-100 py-2" type="submit">Log in Meow!</button>

            
            

        </div>
        </main>
        </div>

    
    </>
}

export default LoginShelter