import React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { useState } from 'react';
import { useEffect } from 'react';


export default function CardVerticalFromSearch(props) {
    // console.log(props.school);
    
    const [isFavorite, setIsFavorite]=useState(false)
    useEffect(()=>{
        props.isFavorite != undefined && setIsFavorite(props.isFavorite);
    //    console.log(props);
    },[])
  return (
    <div className='card' >
        <div className='card__header'>
            
            <img className='img--card'   src="https://picsum.photos/seed/picsum/360/104"></img> 
            <div id='1' className='icon__heart' 
                        onClick={
                            () =>{ props.setIdPost(props.school.id_post, !isFavorite); setIsFavorite(!isFavorite) } }
            >
                    {
                        isFavorite ?<StaticImage className=''
                        src="../../static/svg/heart-active.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                    /> :
                    <StaticImage className=''
                        src="../../static/svg/heart.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                    />
                    }
                    
            </div>
        </div>
        <div className='card__body' >
            <h3 className='title' dangerouslySetInnerHTML={{__html:props.school.nameSchool}} >
                
            </h3>
            <div className='items' >
                <label className='text--ext-sm text--secondary text-label'>
                     {props.school.typeSchool}
                </label>

                <p className='item__stars' >  
                    ({props.school.stars}) 
                </p>
            </div>
            <ul className='list' >
                <li className='list__paragraph--icon'>
                    <StaticImage
                    src="../../static/svg/gratuation__cap.svg"
                    alt="A dinosaur"
                    placeholder="blurred"
                    layout="fixed"
                    />
                    {props.school.levels !== undefined && props.school.levels.join(', ')}
                </li>
                <li className='list__paragraph--icon'>
                    <StaticImage
                    src="../../static/svg/map_point.svg"
                    alt="A dinosaur"
                    placeholder="blurred"
                    layout="fixed"
                    />
                    {props.school.ubication}                                    
                </li>                                
                <li className='list__paragraph--icon emoticon'>
                    💛😄💸
                </li>
                <li className='list__paragraph--icon price'>                                    
                    {props.school.price} MXN                                    
                </li>
            </ul>
        </div>
        <div className='card__footer' >
            <ul className='list'>
                <li>
                    <a href={`/colegio/${props.school.slug}`} className='btn btn__ghost--primary btn--normal'>
                    Leer Más
                    </a>
                    {/* 
                    <a href={`/colegio/${props.school.slug}`} className='btn__ghost--primary btn--ext-sm'>
                    Leer Más
                    </a>
                    */}
                </li>
                <li>
                    {/* <a className='btn__ghost--secondary btn--ext-sm' href='#' >
                        Contactar
                    </a> */}
                    <a href='#' className='btn btn--normal btn--primary'>
                        Contactar
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}
