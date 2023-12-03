import { Outlet, Link, useLocation } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import "../Home/style.css"
import "../LoginSeeker/style.css"
import { useState } from "react"



const LoginShelter = () => {
    const [username, setUsername] = useState("");
    const [password, setPw] = useState("");
    const [errorMsg, setErrorMsg] =useState("");

    const login = async() =>{
        if (username === "" || password === ""){
            setErrorMsg("Error Messages: All fields are required.");
            return
        }

        const userData = {'username': username, 'password':password};

        try{
            const resp = fetch("http://localhost:8000/account/token/", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            if (!resp.ok){
                if ((await resp).status === 401){
                    setErrorMsg("Error Messages: Unauthorized Action");
                    return
                }
                const errorData = await resp.json();
                const allError = Object.values(errorData);
                setErrorMsg("Error Messages: " + allError);
            }
            else{
                window.location.href("/HomeShelter");
            }
        }
        catch(error){
            console.error("Error: ", error);
        }


    }

    const logout = async() =>{
        try{
            const resp = fetch("http://localhost:8000/account/logout/",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token <user_token>',
                  },
            });
            if (resp.ok) {
                // Successful logout
                console.log('User logged out successfully');
                // Perform any client-side logout actions, such as clearing the token from local storage
              } else {
                // Handle logout error
                console.error('Logout failed:', resp.statusText);
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

            //<button onClick={logout} className="btn btnStyle w-100 py-2" type="submit">Log OUT</button>
            

        </div>
        </main>
        </div>

    
    </>
}

export default LoginShelter