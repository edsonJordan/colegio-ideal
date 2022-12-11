import React, { Children, useContext, useEffect, useState } from 'react'
import "react-multi-carousel/lib/styles.css";
import useResizeObserver from 'use-resize-observer';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"

import CardVertical from '../cards/CardVertical';
import axios from 'axios';

export default function GridMeSchools(){
  
  const dispatch = useContext(GlobalDispatchContext)
  const stateAuth = useContext(GlobalStateContext)

  const [schoolsFavorites, setSchoolsFavorites]=useState([]);

  const [schools, setSchools]=useState([]);
  const [loadPaginate, setLoadPaginate]=useState(false)
  

  const [paginateTotalSchool, setPaginateTotalSchool]=useState(0)
  const [statePaginate, setStatePaginate]=useState(1)
  // const [schools, setSchools]=useState([])

  const getSchoolsFavorite = ()=>{
    fetch(`${process.env.WP_URL_REST}/apischool/v1/favorites/${stateAuth.data.id_user}?per_page=1000`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${stateAuth.data.token}`
      }
    })
    .then(response => response.json())
    .then(
      (data) => {
        setSchoolsFavorites(data.map((element)=> {return [element.id_post]}).reduce((acc, id_post)=>{ return acc.concat(parseInt(id_post)) },[]));
      } 
    )
    .catch((error)=>console.log(error));  
}

  const getSchools = (firstLoad = false, paginateNumber)=>{
      setLoadPaginate(true)
        axios(`${process.env.WP_URL_REST}/wp/v2/colegio?author=${stateAuth.data.id_user}&page=${paginateNumber}&per_page=8&_embed`,{
            // http://localhost/2022/ProyectoColegios/wp-json/wp/v2/colegio?author=1&page=4
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${stateAuth.data.token}`
        }
      })      
      .then(
        (response) => {
          setLoadPaginate(false)
            firstLoad && setPaginateTotalSchool(parseInt( response.headers['x-wp-totalpages'])); 
            console.log(response.data);
            setSchools(response.data.map((element)=>{return {
            id_post:element.id,
            isFavorite:false,
            nameSchool:element.title.rendered, 
            // typeSchool:element.fields.type.split(":")[1].trim(), 
            // typeSchool:element['_embedded']['wp:term'][2].map(element=>element.name)[0], 
            // levels:element['_embedded']['wp:term'][1].map(element=>element.name),
            typeSchool:element['_embedded']['wp:term'][2].length !== 0 ? element['_embedded']['wp:term'][2].map(element=>element.name) : [],                 
            levels:element['_embedded']['wp:term'][1].length !== 0 ? element['_embedded']['wp:term'][1].map(element=>element.name): [],
            ubication: element.acf.direction,
            opinion:"buen trato economico",
            price:element.acf.price,
            phone:element.acf.phone,
            whatsapp: element.acf.whatsapp,
            web: element.acf.web,
            stars: "3.6",
            slug:element.slug
          }
          }));
        } 
      )
      .catch((error)=>console.log(error));  
  }
  // console.log( )
 
  const handlePaginate=(event)=>{


    
    setStatePaginate(event.target.value)
  }




  useEffect(()=>{
    // console.log(stateAuth.data.token);
    if (!stateAuth.isLogin) {            
        return window.location = '/login';
      }
    getSchoolsFavorite()
    getSchools(true, statePaginate)
    // console.log(stateAuth.data.token);
    // console.log(process.env.WP_URL_REST);
  },[])
  
  useEffect(()=>{
    getSchools(false, statePaginate);
  },[statePaginate])

  useEffect(()=>{
    // console.log(schools);
      // setSchools(schools.map((element)=>{ return schoolsFavorites.includes(element.id_post)? {...element, isFavorite:true}:{...element}}))
  }, [schoolsFavorites])

  const { ref, width = 1, height = 1 } = useResizeObserver();

    // const [value, setValue] = useState(0);

    const addPostFavorite = (idPost, idUser)=>{
      const data = {
        "user": idUser,
        'post':idPost 
        }; 
        axios.post(`${process.env.WP_URL_REST}`+"/apischool/v1/favorites", JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${stateAuth.data.token}`
          }
        }
        )
        .then((response)=>{console.log(response)})
        .catch(({response})=>{ console.log(response)});      
    }
    const deletePostFavorite =(idPost, idUser)=>{
      const data = {
        "user": idUser,
        'post':idPost 
        }; 
        axios.post(`${process.env.WP_URL_REST}`+"/apischool/v1/favorites/delete", JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${stateAuth.data.token}`
          }
        }
        )
        .then((response)=>{console.log(response)})
        .catch(({response})=>{ console.log(response)});        
      }
    const setIdPost =  (idPost, isFavorite)=>{
      if(isFavorite){
        addPostFavorite(idPost, stateAuth.data.id_user)
        setSchoolsFavorites([...schoolsFavorites, idPost])
      }else{
        deletePostFavorite(idPost,stateAuth.data.id_user)
        setSchoolsFavorites(schoolsFavorites.filter(element=>element!==idPost))
        // console.log(idPost,stateAuth.data.username);
      }
    }
 return (
 <>
      <h1 ref={ref} className='title--h6 section' >
        Tus colegios
      </h1>
      <div className='grid sm:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4	carousel--container' >
        {
           loadPaginate ? "" : schools.map((element)=>{ return schoolsFavorites.includes(element.id_post)? {...element, isFavorite:true}:{...element}})
           .map((element,index) => (            
            <CardVertical  key={`card-${index}`}  isFavorite={element.isFavorite} setIdPost={setIdPost} school={element}/>                   
          ))
        }         
      </div>
      <div className='flex flex-row gap-x-2 justify-center py-8'>
            {[...Array(paginateTotalSchool)].map((elementInArray, index) => ( 
                <div key={`item-paginate-${index}`} >                
                    <input type="radio" defaultChecked={index+1 === statePaginate && "checked" }   onChange={(event)=>{handlePaginate(event)}} className="radio-paginate" name='typeSearch' id={`radio-paginate-${index+1}`}  value={index+1} />
                    <label className='btn btn--normal btn--secondary-ghost' htmlFor={`radio-paginate-${index+1}`} >{index+1}</label>
                </div>
                ) 
            )} 
      </div> 
 </>)
}
