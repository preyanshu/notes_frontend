import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';




const Login = (props) => {
    const {showAlert}=props;
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const [loading, setloading] = useState(false) ;
    // let history = useHistory();
    let navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        const response = await fetch("https://backend-jiu4.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        setloading(false);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 

            navigate("/");
            showAlert("login succesful","success")

        }
        else{
            showAlert("invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        
                <div className="flex1 flex2">
                    <div style={{height: 300 + 'px',width : 300+"px"}}>
         <lottie-player src="https://lottie.host/1c422d67-8e54-414d-8df9-6bcf6e3c0f40/FLyI5miodA.json"  speed="1" style={{height: 300+'px',width : 300+"px"}} direction="1" mode="normal" loop autoplay></lottie-player>
         </div>

         {loading && <h1>  LOADING...</h1>}
         {!loading && <div className='login container'>
            <h1 className='text-center pb-3'>Login</h1>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary mb-3 mt-3">Submit</button>
            </form>
        </div> }
                    
            
                
               </div>                
         
    )
}

export default Login