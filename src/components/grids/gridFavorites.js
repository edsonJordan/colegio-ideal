import React, { Children, useContext, useEffect, useState } from 'react'
import "react-multi-carousel/lib/styles.css";
import useResizeObserver from 'use-resize-observer';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"

import CardVertical from '../cards/CardVertical';
import axios from 'axios';

export default function Grid() {
  
  const dispatch = useContext(GlobalDispatchContext)
  const stateAuth = useContext(GlobalStateContext)

  const [favorites, setFavorites]=useState([]);
  // const [schools, setSchools]=useState([])


  const getSchoolsFavorite = ()=>{
      fetch(`${process.env.WP_URL_REST}/apischool/v1/favorites/${stateAuth.data.username}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${stateAuth.data.token}`
        }
      })
      .then(response => response.json())
      .then(
        (data) => {
          setFavorites(data.map((element)=>{return {
            id_post:element.id_post,
            nameSchool:element.post.post_title, 
            // typeSchool:element.fields.type.split(":")[1].trim(), 
            typeSchool:element.typeSchool.map(element=>element.name)[0], 
            levels:element.levels.map(element=>element.name),
            // levels: element.fields.level.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()),
            ubication: "Ubicacion",
            opinion:"buen trato economico",
            price:element.fields.price,
            phone:element.fields.phone,
            whatsapp: element.fields.whatsapp,
            web: element.fields.web,
            stars: "3.6",
            slug:element.post.post_name
          }
        }));
          // console.log(data);
        } 
      )
      .catch((error)=>console.log(error));  
  }
  // console.log( )
  useEffect(()=>{
    // console.log(favorites);
  },[favorites])
  useEffect(()=>{
    // console.log(stateAuth.data.token);
    if (!stateAuth.isLogin) {
            
        return window.location = '/login';
     
    }
    getSchoolsFavorite()
    // console.log(stateAuth.data.token);
    // console.log(process.env.WP_URL_REST);
  },[])
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
        addPostFavorite(idPost, stateAuth.data.username)
      }else{
        deletePostFavorite(idPost,stateAuth.data.username)
        // console.log(idPost,stateAuth.data.username);
      }
    }
 return (
 <>
      <h1 ref={ref} className='title--h6 section' >
        Favoritos
      </h1>
      <div className='grid sm:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4	carousel--container' >
        {
           favorites.map((element,index) => (
            <CardVertical  key={index}  isFavorite={true} setIdPost={setIdPost} school={element}/>                   
          ))
        }
      </div>  
 </>)
}
