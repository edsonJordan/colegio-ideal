import React, { useContext, useState, useEffect }  from "react"
import {Footer} from '../../components'
import {Header} from '../../components'
import GlobalContextProvider from '../../context/GlobalContextProvider'
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { StaticImage } from "gatsby-plugin-image"
import { SliderHorizontal } from "../../components/sliders";
import FormComment from "../../components/forms/FormComment";


export default function Post({pageContext}) {
 
 
  const {school} = pageContext;
  const {customFieldColegio}= school;
  const [commentActive, setCommentActiveModal] = useState(false);


  /*  Form Components Comment*/
  const [opinionSchool, setOpinionSchool]= useState("")
  const [typeSchool, setTypeSchool] = useState({value:null,error:false, message:""})
  const [clasificationSchool, setClasificactionSchool] = useState(3)
  const [calidezSchool, setCalidezSchool] = useState({icon:null,value:null,text:null, error:false, message:""})
  const [qualitySchool, setQualitySchool] = useState({icon:null,value:null,text:null, error:false, message:""})
  const [priceSchool, setPriceSchool]     = useState({icon:null,value:null,text:null, error:false, message:""})
  const [feelingSchool, setFeelingSchool] = useState({icon:null,value:null,text:null, error:false, message:""})
  const [feelingChildren, setFeelingChildrenSchool]= useState({icon:null,value:null,text:null, error:false, message:""})


  const handleStateModal=(state)=>{
      if(!state) return setCommentActiveModal(false)
  }

  
  const lenguages = customFieldColegio.lenguages.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
  const activities = customFieldColegio.activities.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
  const approach = customFieldColegio.approach.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()).join(", ")
  const levels= school.levelsSchools.nodes.map(element=>element.name).join(", ")
  const types= school.typeSchools.nodes.map(element=>element.name)[0]
  // console.log(school.databaseId);

  useEffect(()=>{
    // console.log(school);
  }, [])
  
  const seendComment =()=>{
   /*  return axios.post(`${process.env.WP_URL_REST}/wp/v2/comments`, 
    JSON.stringify(data),{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${stateAuth.data.token}` 
        }
    }).then((response)=>{
        console.log("Colegio agregado");
    }).catch((error)=>{
        console.log(error);
    });    */
  }
  const eventModel =  (idPost)=>{
   /*  if(isFavorite){
      addPostFavorite(idPost, stateAuth.data.username)
    }else{
      deletePostFavorite(idPost,stateAuth.data.username)
      // console.log(idPost,stateAuth.data.username);
    } */
  }


  return (
    <div className=" container ">
      <main  className='main'>
      <GlobalContextProvider>
            <Header/>
        </GlobalContextProvider>
        <section className='section section--school'>
          <div className='content__school'>
              <div  className='block__left'>
                <div className='block--school header'>
                      <h1 className='title--h4'>
                        {school.title}
                      </h1>
                    <div className='items'>
                      <label className='text--ext-sm text--secondary text-label'>
                      {types}
                      </label>
                      <p className='item__stars' >
                      4.5
                      </p>
                    </div>
                </div>                
                <div   className='block--school-images'>
                  {/* <div className='w-full'> */}
                        <StaticImage className='image'
                            src="../../static/images/school-portada.jpg"
                            alt="A dinosaur"
                            // width={100} 
                            
                            // maxWidth={300}
                            placeholder="blurred"
                            layout="fixed"
                            />
                  {/* </div> */}
                  <div className='content__images--thumbnails'>
                    <div data-title="portada" className='thumbnail'>
                      <StaticImage  className='image--thumbnail'
                            src="../../static/images/school-fachada.jpg"
                            
                            alt="A dinosaur"
                            placeholder="blurred"
                            layout="fixed"
                            />
                    </div>
                    <div data-title="Instalaciones" className='thumbnail'>
                      <StaticImage  className='image--thumbnail'
                            src="../../static/images/school-instalacion.jpg"
                            
                            alt="A dinosaur"
                            placeholder="blurred"
                            layout="fixed"
                            />
                    </div>
                    <div data-title="Otras" className='thumbnail'>
                      <StaticImage  className='image--thumbnail'
                            src="../../static/images/school-otros.jpg"                            
                            alt="A dinosaur"
                            placeholder="blurred"
                            layout="fixed"
                            />
                    </div>                
                  </div>  
                </div>
                <div className='block--info section-left'>
                    <ul className='list' >
                        <li className='list__paragraph--icon'>
                            <div className='icon'>
                            <StaticImage className='icon--list'
                            src="../../static/svg/gratuation__cap.svg"
                            alt="A dinosaur"
                            placeholder="blurred"
                            layout="fixed"/>
                            </div>                        
                            <p>
                              {levels}
                            </p>
                        </li>
                        <li className='list__paragraph--icon'>
                            <div className='icon'>
                              <StaticImage className='icon--list'
                              src="../../static/svg/map_point.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                            </div>                       
                            <p>

                            </p>
                        </li>
                        <li className="list__paragraph--icon price">$800</li>
                    </ul>
                </div>
                <div className='block--others'>
                    <ul className='list buttons'>
                      <li className=''>
                          <a className="btn ">
                            <StaticImage 
                              src="../../static/svg/phone.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              llamar
                          </a>
                      </li>
                      <li className=''>
                          <a className="btn" href={"mailto:"+customFieldColegio.email}>
                            <StaticImage 
                              src="../../static/svg/email-send.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              Enviar email
                          </a>
                      </li>
                      <li className=''>
                          <a className="btn" href={customFieldColegio.web}>
                            <StaticImage 
                              src="../../static/svg/world.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              Visitar web
                          </a>
                      </li>
                    </ul>
                    <ul className='list links'>
                        <li className=''>
                          <a href={customFieldColegio.instagram} className='btn__ghost--secondary btn--ext-sm'>
                              Instagram
                          </a>
                        </li>
                        <li className=''>
                          <a href={customFieldColegio.facebook} className='btn__ghost--secondary btn--ext-sm'>
                              Facebook
                          </a>
                        </li>
                        <li className=''>
                          <a href={customFieldColegio.whatsapp} className='btn__ghost--secondary btn--ext-sm'>
                              Whatsapp
                          </a>
                        </li>
                    </ul>
                    <div className='others__texts'>
                        <div className='text lenguages'>                            
                            <span>
                              <b>
                              Idiomas: &nbsp;
                              </b>
                              {/* Ingles */}
                              {lenguages}
                            </span>
                        </div>
                        <div className='text approaches'>                            
                            <span>
                              <b>
                              Enfoques: &nbsp;
                              </b>
                              {approach}
                            </span>
                        </div> 
                        <div className='text activities'>                            
                            <span>
                              <b>Actividades extras: </b>&nbsp;
                              {activities}
                            </span>
                        </div>  
                        <div className='text description'>
                            <p className='title'>
                              Descripción
                            </p>
                            <span className='paragraph'>
                              {customFieldColegio.description}
                            </span>
                        </div>
                        <div className='text proposal'>
                            <p className='title'>
                              Propuesta
                            </p>
                            <span className='paragraph'>
                            {customFieldColegio.proposal}
                            </span>
                        </div>
                        <div className='text opinion'>
                            <p className='title'>
                              Opiniones
                            </p>
                            <span className='paragraph'>
                              46 calificaciones
                            </span>
                        </div>                                
                        <div className='text text--loading'>
                          <p className='title'>
                            Populares
                          </p>
                          <div className='block--load-bar'>
                            <p className='title--load-bar' >
                              Calidez Humana
                            </p>
                            <div className='load-bar' >
                                <div data-indice="95" className='load-bar__content'>
                                💕Excelente
                                </div>
                            </div>
                          </div>
                          <div className='block--load-bar'>
                            <p className='title--load-bar' >
                              Calidad educativa
                            </p>
                            <div  className='load-bar' >
                                <div data-indice="95" className='load-bar__content'>
                                🤓Excelente
                                </div>
                            </div>
                          </div>
                          <div className='block--load-bar'>
                            <p className='title--load-bar' >
                              Calidad educativa
                            </p>
                            <div  className='load-bar' >
                                <div data-indice="95" className='load-bar__content'>
                                💸Ecónomico
                                </div>
                            </div>
                          </div>
                        </div>     
                    </div>
                </div>                
                <div className='block--comments'>
                    <p className='title'>
                      Ordenar por
                    </p>                    
                    <div className='form--buttons-comments'>
                        <div className='container--select'>
                          <select className='input--select' >
                                <option>
                                  Mas recientes
                                </option>
                                <option>
                                  Mas antiguos
                                </option>
                                <option>
                                  Mejores puntuaciones
                                </option>
                          </select>
                        </div>
                        <a onClick={()=>{setCommentActiveModal(true)}} className="btn btn--normal btn--primary">Escribir opinion</a>  
                    </div>            
                </div>
                <div className='container__comment' >
                    <div className='content__coments'>
                        <div className='card--comment'>
                            <div className='card__header'>
                              <StaticImage className='avatar--comment' src={"https://picsum.photos/seed/picsum/40/40"} alt="A dinosaur" placeholder="blurred" layout="fixed" />
                            </div>
                            <div className='card__body'>
                                <div className='comment' >
                                    <h3 className='title'>
                                      Martha Marcano
                                    </h3>
                                    <div className='block--stars-with-date'>
                                      <p className='paragraph-stars'>
                                        ★★★★★
                                      </p>
                                      <p className='paragraph-date' >
                                        21 sep, 2021
                                      </p>
                                    </div>
                                    <span>
                                      Una opción inmejorable, es un centro con gran personalidad.
                                    </span>
                                </div>
                                <details>
                                  <summary>Detalles</summary>
                                  <div className='content__comment-details'>
                                    <div className='block__details'>
                                        <div className='content__details'>
                                            <div className='detail'>
                                              <p className='title--detail'>
                                                Calidez humana
                                              </p>
                                              <div className='description'>
                                                💕
                                                <p>Excelente</p>
                                              </div>
                                            </div>
                                            <div className='detail'>
                                              <p className='title--detail'>
                                                Calidad educativa
                                              </p>
                                              <div className='description'>
                                                🤓
                                                <p>Excelente</p>
                                              </div>
                                            </div>
                                            <div className='detail'>
                                              <p className='title--detail'>
                                                Precio
                                              </p>
                                              <div className='description'>
                                                💸
                                                <p>Ecónomico</p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='block__details'>
                                        <div className='content__details'>
                                            <div className='detail'>
                                              <p className='title--detail'>
                                              Impresion de padres
                                              </p>
                                              <div className='description'>
                                                💕
                                                <p>Excelente</p>
                                              </div>
                                            </div>
                                            <div className='detail'>
                                              <p className='title--detail'>
                                                Imprensión de hijos
                                              </p>
                                              <div className='description'>
                                                💕
                                                <p>Excelente</p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <aside className='aside-school' >
                <div className='block--school header'>
                      <h1 className='title--h4'>
                      {school.title}
                      </h1>
                    <div className='items'>
                      <label className='text--ext-sm text--secondary text-label'>
                      {types}
                      </label>
                      <p className='item__stars' >
                      4.5
                      </p>
                    </div>
                </div>
                <div className='block--info'>
                    <ul className='list' >
                        <li className='list__paragraph--icon'>
                            <div className='icon'>
                            <StaticImage className='icon--list'
                            src="../../static/svg/gratuation__cap.svg"
                            alt="A dinosaur"
                            placeholder="blurred"
                            layout="fixed"/>
                            </div>                        
                            <p>
                              {levels}
                            </p>
                        </li>
                        <li className='list__paragraph--icon'>
                            <div className='icon'>
                              <StaticImage className='icon--list'
                              src="../../static/svg/map_point.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                            </div>                       
                            <p>
                                {customFieldColegio.direction}                            
                            </p>
                        </li>
                        <li className="list__paragraph--icon price">$800</li>
                    </ul>
                </div>
                <div className='block--others'>
                    <ul className='list buttons'>
                      <li className=''>
                          <a href={"tel:"+customFieldColegio.phone} className="btn">
                            <StaticImage 
                              src="../../static/svg/phone.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              llamar
                          </a>
                      </li>
                      <li className=''>
                          <a className="btn" href={"mailto:"+customFieldColegio.email}>
                            <StaticImage 
                              src="../../static/svg/email-send.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              Enviar email
                          </a>
                      </li>
                      <li className=''>
                          <a className="btn" href={customFieldColegio.web}>
                            <StaticImage 
                              src="../../static/svg/world.svg"
                              alt="A dinosaur"
                              placeholder="blurred"
                              layout="fixed"
                              />
                              Visitar web
                          </a>
                      </li>
                    </ul>                    
                    <div className='others__texts'>
                        <div className='text lenguages'>                            
                            <span>
                              <b>
                              Idiomas: &nbsp;
                              </b>
                              {/* Ingles */}
                              {lenguages}
                            </span>
                        </div>
                        <div className='text approaches'>                            
                            <span>
                              <b>
                              Enfoques: &nbsp;
                              </b>
                              {approach}
                            </span>
                        </div> 
                        <div className='text activities'>                            
                            <span>
                              <b>Actividades extras: </b>&nbsp;
                              {activities}
                            </span>
                        </div> 
                    </div>
                    <ul className='list links'>
                        <li className=''>
                          <a href={customFieldColegio.instagram} className='btn__ghost--secondary btn--ext-sm'>
                              Instagram
                          </a>
                        </li>
                        <li className=''>
                          <a href={customFieldColegio.facebook} className='btn__ghost--secondary btn--ext-sm'>
                              Facebook
                          </a>
                        </li>
                        <li className=''>
                          <a href={customFieldColegio.whatsapp} className='btn__ghost--secondary btn--ext-sm'>
                              Whatsapp
                          </a>
                        </li>
                    </ul>
                </div> 
              </aside>
            </div>
         

          {/* Opiniones - Comentarios */}
          
            {/* <h2 ref={ref} className='title--h6 pl-4 pb-2' >
                Colegios Similares
            </h2>
            <Carousel  itemClass="carousel-item--card" containerClass='carousel--container' centerMode={width<410 ? true : false}   responsive={responsive}>
              {
                  items.map(school => (
                      <div key={school} className='card'>
                          <div className='card__header'>
                              <img className='img--card'  src="https://picsum.photos/seed/picsum/360/104"></img> 
                              
                          </div>
                          <div className='card__body' >
                              <h3 className='title' >
                                  {school.nameSchool}
                              </h3>
                              <div className='items' >
                                  <label className='text--ext-sm text--secondary text-label'>
                                      Pública
                                  </label>

                                  <p className='item__stars' >  
                                  ({school.stars}) 
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
                                      {school.levels.join(',')}
                                  </li>
                                  <li className='list__paragraph--icon'>
                                      <StaticImage
                                      src="../../static/svg/map_point.svg"
                                      alt="A dinosaur"
                                      placeholder="blurred"
                                      layout="fixed"
                                      />
                                      {school.ubication}                                    
                                  </li>                                
                                  <li className='list__paragraph--icon emoticon'>
                                      💕🤓💸
                                  </li>
                                  <li className='list__paragraph--icon price'>                                    
                                      ${school.price}                                    
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
                    ))
              }                
            </Carousel>
            <br/> */}
        <GlobalContextProvider>
            <SliderHorizontal title={"Colegios similares"} />
            {/* <SliderHorizontal title={"Cerca de tí"} /> */}
        </GlobalContextProvider>
        </section>
        <Footer/>
      </main>
      {commentActive && 
       <GlobalContextProvider>
         <FormComment handleStateModal={handleStateModal}  post={school.databaseId}/>
       </GlobalContextProvider>
      }
     
    </div>
  );
}