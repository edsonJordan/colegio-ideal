import React, {  useContext,  useState }  from "react"
import axios from "axios"
import { StaticImage } from "gatsby-plugin-image"

import {  GlobalDispatchContext,  GlobalStateContext,} from "../../context/GlobalContextProvider"
import { useRef } from "react"
import { Link } from "gatsby"
const  FormRegisterUser = () => {  
    const setLogin = useContext(GlobalDispatchContext)
    const statusLogin = useContext(GlobalStateContext)
    
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageLoggin, setMessageLoggin] = useState("");

    const stateRefPassword = useRef();
    const [passwordIsActive, setPasswordIsActive] = useState(true);
    
    // state
   /*  useEffect(() => {
      // console.log(State.getStatesOfCountry())
     console.log(passwordIsActive);    
    },[passwordIsActive]) */
    const fetchToken  = (userName, password) => {
      const data = {
        "username":userName ,
        'password':password 
      };                 
      return axios.post(`${process.env.WP_URL_REST}/jwt-auth/v1/token`, JSON.stringify(data),{headers: {
        'Content-Type': 'application/json',}
        }).then((response)=>{ return response}).catch(({response})=>{return response});
    }

    const createUser = (userName, email, password)=>{
      const data = {
        "username":userName,
        'email':email,
        'password':password 
      };   
      return axios.post(`${process.env.WP_URL_REST}`+"/apischool/v1/students", JSON.stringify(data),{headers: {
        'Content-Type': 'application/json',}
        }).then((response)=>{ return response}).catch(({response})=>{return response});              
    }

    const checkTokken= (fetchLogin)=>{
      switch (fetchLogin.status) {
        case 200:
          // console.log("Loggin exitoso"); 
          setLogin({token:fetchLogin.data.token, username:fetchLogin.data.user_display_name, user_email:fetchLogin.data.user_email})
          break;
        case 403:
          const errorMessage = fetchLogin.data.message;
          // console.log("Error");       
          const message = errorMessage.slice(0, errorMessage.indexOf('<a'))
          setMessageLoggin(`${message} <a href="/lostPassword">¿Has olvidado tu contraseña?</a>`)
            break;      
        default:
          console.log("Error comuniquese con el equipo de desarrollo");
          break;
      }
    }

    const handleSubmit = async (e) =>{        
        e.preventDefault()
      if( userName.length < 1  || userEmail.length <1 || password.length <1) return console.log("Campo vacio"); 
          const userCreated = await createUser(userName, userEmail, password);
          // console.log(userCreated);
      if (userCreated.data.success){
            const username = userName;
            const pass_user = password;
            const fetchLogin = await fetchToken(username, pass_user)
            checkTokken(fetchLogin)
            if (typeof window !== `undefined`){ 
               
              window.location = '/';
            }
            setMessageLoggin(null)
      }else{
        const errorMessage = userCreated.data.message;
        const message = errorMessage.slice(0, errorMessage.indexOf('<a'))
        setMessageLoggin(`${message} <a href="/lostPassword">¿Has olvidado tu contraseña?</a>`)
        }       
      }
      const handlePassword=()=>{
        if(passwordIsActive){
          setPasswordIsActive(false)
        }else{
          setPasswordIsActive(true)
        }
      }

    return (    
    <main className="section section--login">
      <Link to="/">
        <StaticImage src="../../static/images/logo-normal.png" alt="A dinosaur" placeholder="blurred" layout="fixed" />
      </Link>
      <p className="subtitle" >Comienza gratis</p>
      <h1 className="title--h3 text-global-gray-650">Crear Cuenta</h1>
      <form className="form" onSubmit={(e)=>{handleSubmit(e)}} >
          <div className='form__block'>
            <label htmlFor="userName" >Usuario</label>
            <input type="text"  onChange={(e)=>setUserName(e.target.value)} id="userName" value={userName} placeholder='Ingrese su cuenta' />
          </div>

          <div className="form__block">
          <label htmlFor="password" >Correo</label>   
            <input type="text"  onChange={(e)=>setUserEmail(e.target.value)} value={userEmail} placeholder='Ingrese su cuenta' />
          </div>  

          <div className='form__block'>
            <label htmlFor="password" >Contraseña</label>            
            <input ref={stateRefPassword} onChange={(e)=>setPassword(e.target.value)} id="password" value={password} type={passwordIsActive ? "password":"text"}  />
            <div onClick={handlePassword} >
            
              <StaticImage className="password--hiden btn" src="../../static/svg/eye.svg" alt="A dinosaur" placeholder="blurred" layout="fixed" />            
            
            </div>
          </div>  
          {/* <div className='form__block'>
          <div dangerouslySetInnerHTML={{__html: messageLoggin}} ></div>
          </div>   */}
          <div className="form__block">
          <input type="submit" className="w-full btn btn--normal btn--primary "  value="Crear cuenta" />
            <Link to="/login" className="btn btn--normal btn--secondary" >Iniciar Sesión </Link>
          </div>  
            
            
        </form> 
    </main>
      )
  
}
export default FormRegisterUser