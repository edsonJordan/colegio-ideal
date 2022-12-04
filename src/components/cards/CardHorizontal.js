import React from 'react'
import { StaticImage } from "gatsby-plugin-image"

export default function CardHorizontal() {
  return (
    <div /* key={school} */ className='card horizontal'>
        <div className='card__header'>
            <img className='img--card'  src="https://picsum.photos/seed/picsum/360/104"></img> 
        </div>
        <div className='card__body'>
            <h3 className='title' >
                Colegio imperial
            </h3>
            <div className='items' >
                <label className='text--ext-sm text--secondary text-label'>
                    Pública
                </label>

                <p className='item__stars' >  
                estrellas
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
                   niveles
                </li>
                <li className='list__paragraph--icon'>
                    <StaticImage
                    src="../../static/svg/map_point.svg"
                    alt="A dinosaur"
                    placeholder="blurred"
                    layout="fixed"
                    />
                    data                                
                </li>                                
                <li className='list__paragraph--icon emoticon'>
                    💕🤓💸
                </li>
                <li className='list__paragraph--icon price'>                                    
                    $800                                    
                </li>
            </ul>
        </div>
         <div className='card__footer' >
            <ul className='list'>
                <li>
                    <a className='btn__ghost--secondary btn--ext-sm' href='#' >
                        Leer Más
                    </a>
                </li>
                <li>
                    <a className='btn__ghost--secondary btn--ext-sm' href='#' >
                        Contactar
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}
