import React from 'react'
import { useEffect,useState,useContext } from 'react';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import useResizeObserver from 'use-resize-observer';
import CardVertical from '../cards/CardVertical';
import axios from 'axios';
import {
    GlobalDispatchContext,
    GlobalStateContext,
  } from "../../context/GlobalContextProvider"

export default function SliderHorizontal({title}) {
    const { ref, width = 1/* , height = 1  */} = useResizeObserver();
    const [schools, setSchools]=useState([]); 
    const [favoritesSchools, setFavoritesSchools]=useState([]);

    const dispatch = useContext(GlobalDispatchContext)
    const stateAuth = useContext(GlobalStateContext)

    const addPostFavorite = (idPost, user_name)=>{
        const data = {
          "user": user_name,
          'post':idPost 
          }; 
          axios.post(`${process.env.WP_URL_REST}/apischool/v1/favorites`, JSON.stringify(data),
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
      const deletePostFavorite =(idPost, user_name)=>{
        const data = {
          "user": user_name,
          'post':idPost 
          }; 
          axios.post(`${process.env.WP_URL_REST}/apischool/v1/favorites/delete`, JSON.stringify(data),
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
      const getSchools = ()=>{
            fetch(`${process.env.WP_URL_REST}/wp/v2/colegio?_embed`,{
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(
              (data) => {
                setSchools(data.map((element)=>{                  
                  // console.log(element['_embedded']['wp:term'][1].map(element=>element.name));  
                  // console.log(element.acf);                
                  return {
                  id_post:element.id,
                  nameSchool:element.title.rendered, 
                  typeSchool:element['_embedded']['wp:term'][2].map(element=>element.name)[0], 
                  // levels: element.acf.level.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()),
                  levels:element['_embedded']['wp:term'][1].map(element=>element.name),
                  ubication: element.acf.direction,
                  opinion:"buen trato economico",
                  price:element.acf.price,
                  phone:element.acf.phone,
                  whatsapp: element.acf.whatsapp,
                  web: element.acf.web,
                  stars: "3.6",
                  isFavorite:false,
                  slug:element.slug
                }}))
                
              } 
            )
            .catch((error)=>console.log(error));
        }
        const getSchoolsFavorites = ()=>{
            if (!stateAuth.isLogin) return false;
            fetch(`${process.env.WP_URL_REST}/apischool/v1/favorites/${stateAuth.data.username}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${stateAuth.data.token}`
              }
            })
            .then(response => response.json())
            .then(
              (data) => {
                    setFavoritesSchools(data.map((element)=> {return [element.post_id]}).reduce((acc, id_post)=>{ return acc.concat(parseInt(id_post)) },[]));
              } 
            )
            .catch((error)=>console.log(error));
        }
        
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 5
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 424 },
              items: 3
            },
            mobile: {
              breakpoint: { max: 424, min: 0 },
              items:0.5,     
              slidesToSlide: 1,
              centerMode:true     
              /* items: 1.25,
              slidesToSlide: 0.75 */
            }
          };
          const [value, setValue] = useState(0);
          useEffect(() => {
            // console.log(State.getStatesOfCountry())
            //  console.log(actionRegister);
            //   console.log(width);
            // widthScreen < 425 ? setIsMobile(true) :setIsMobile(false)
            getSchools();
            getSchoolsFavorites();
          },[])
          
          useEffect(() => {
            // console.log(favoritesSchools);
          },[favoritesSchools])

          useEffect(() => {
            // console.log(schools);
          },[schools])
        
        const flowParentToChild = (idPost, isFavorite)=>{
            if (!stateAuth.isLogin){
              if (typeof window !== `undefined`){ 
                 
                return window.location = '/login';
              }
            }  
            // alert("Hola");
            if(isFavorite){
              addPostFavorite(idPost, stateAuth.data.username)
            }else{
              deletePostFavorite(idPost,stateAuth.data.username)
            }
        }

        /* 
        
        const lenguages = customFieldColegio.lenguages.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
        const activities = customFieldColegio.activities.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
        const approach = customFieldColegio.approach.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
        const levels= customFieldColegio.level.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
        */
    return (
        <>
             <h2 ref={ref} className='title--h6 section' >
                 {title}
             </h2>
             <Carousel  itemClass="carousel-item--card" containerClass='carousel--container' centerMode={width<410 ? true : false}   responsive={responsive}>
             {
                  schools
                  .map((element)=>{ return favoritesSchools.includes(element.id_post)? {...element, isFavorite:true}:{...element}})
                  .map((element,index) => (
                     <CardVertical key={index} isFavorite={element.isFavorite}  setValue={setValue} setIdPost={flowParentToChild} school={element}/>         
                   ))
             }                
             </Carousel>
            
    </>)
}
