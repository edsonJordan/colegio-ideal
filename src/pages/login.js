import React  from "react"
import GlobalContextProvider from "../context/GlobalContextProvider"
import FormLogin from "../components/forms/FormLogin";



const Login = ()=> {


   /*  const handleSubmit = async (e) =>{        
        e.preventDefault()
        const data = 
        {
            "username":userName ,
            'password':password 
        };           
        const result = await 
            axios.post(`${process.env.WP_URL_REST}`+"/jwt-auth/v1/token", 
            JSON.stringify(data),{headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0LzIwMjIvUHJveWVjdG9Db2xlZ2lvcyIsImlhdCI6MTY2Njc5OTMwNSwibmJmIjoxNjY2Nzk5MzA1LCJleHAiOjE2Njc0MDQxMDUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.PBTk4vVoYMrIINkS48zbTSd4as8l40f00En0wDPEB14'
                }
            }
            )
            .then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
    } */

  return (
    <GlobalContextProvider>
        <FormLogin/>
        {/* <form onSubmit={(e)=>{handleSubmit(e)}} >
            <input type="text" onChange={(e)=>setUserName(e.target.value)} value={userName} placeholder='Ingrese su cuenta' />
            <br/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='*****' />
            <br/>
            <input type="submit" />
        </form> */}
    </GlobalContextProvider>
  )
}
export default Login