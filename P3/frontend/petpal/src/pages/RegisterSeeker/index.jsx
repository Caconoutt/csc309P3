import { useState } from "react";
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"




const RegisterSeeker = () => {
    //initial variables
    const [errorMsg, setErrorMsg] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPw1] = useState("");
    const [password2, setPw2] = useState("");
    const [isChecked, setChecked] = useState(false);


    const signUp =  async() => {
        
        if (password !== password2) {
            setErrorMsg("Passwords do not match.");
            return 
        }

        if (isChecked === false) {
            setErrorMsg("Please agree to Term&Condition.");
            return
        }

        const userData = {'username': username, 'email': email, 'password': password, 'password2': password2}
        
        try{
            const resp = await fetch('http://localhost:8000/account/seeker/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                
            });
            if (!resp.ok){
                const errorData = await resp.json();
                const allError = Object.values(errorData);
                setErrorMsg("Error Messages: " + allError);
            }
            else{
                window.location.href = "/LoginSeeker";
            }
        }
        catch (error){
            console.error('Error:', error);
        }
    }


    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">
        <div className="intro">

        <img className="mb-4" src={logo1} alt="" height="40" />
        <img className="mb-4" src={logo} alt="" height="40" />
        <h1 className="h3 mb-3 fw-normal">Welcome to be a pet seeker!</h1>
        </div>


        
        <div id="showOne">
            
            <div className="form-floating">
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="floatingUsername" placeholder="Username" />
                <label for="placeholder">Username</label>
            </div>
            <div className="form-floating">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="registerEmail" placeholder="Email address" />
                <label for="placeholder">Email address</label>
            </div>
            <div className="form-floating">
                <input value={password} onChange={e => setPw1(e.target.value)} type="password" className="form-control" id="registerPw1" placeholder="Password" />
                <label for="placeholder">Password</label>
            </div>
            <div className="form-floating">
                <input value={password2} onChange={e => setPw2(e.target.value)} type="password" className="form-control" id="registerPw2" placeholder="Password Doublecheck" />
                <label for="placeholder">Password Doublecheck</label>
            </div>

            <div className="text-start">
            <span id="errorMsg">{errorMsg}</span>
            </div>

            <div className="form-check text-start remember-me-margin">
                <input className="form-check-input" type="checkbox" value={isChecked} onChange={() => {setChecked(!isChecked)}} id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                    Agree to Terms&Condition
                </label>
            </div>

         
            <button onClick={signUp} className="btn btnStyle w-100 py-2">Sign up Meow!</button>
            

        </div>
        </main>
        </div>
    </>
}

export default RegisterSeeker