import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import "../Home/style.css"
import "../LoginSeeker/style.css"



const LoginShelter = () => {
    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">
        <div className="intro">

        <img className="mb-4" src={logo1} alt="" height="40" />
        <img className="mb-4" src={logo} alt="" height="40" />
        <h1 className="h3 mb-3 fw-normal">Welcome back, pet shelter!</h1>
        </div>

        
        <div id="showOne">
            <form>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div className="form-check text-start remember-me-margin">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                    Agree to Terms&Condition
                </label>
            </div>

         
            <button className="btn btnStyle w-100 py-2" type="submit"><a href="seekerLogin.html">Sign up Meow!</a></button>
            </form>

        </div>
        </main>
        </div>

    
    </>
}

export default LoginShelter