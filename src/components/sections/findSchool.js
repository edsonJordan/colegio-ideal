import React, {useState, useEffect} from 'react'
import { StaticImage } from "gatsby-plugin-image"
import "react-multi-carousel/lib/styles.css";
import GlobalContextProvider from "../../context/GlobalContextProvider"
import Select from 'react-select'
import {SliderHorizontal} from '../sliders';
import {  State }  from 'country-state-city';
import { Link, useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'



export default function FindSchool({data}) {

    const [states, setStates] = useState([]);
    const [linkToSeach, setLinkToSearch] = useState("/");
    const {allWpStateSchool, allWpLevelsSchool}= useStaticQuery(graphql`
    query ($limit: Int = 100) {
        allWpStateSchool(limit: $limit) {
          nodes {
            databaseId
            name
            slug
          }
        }
        allWpLevelsSchool(limit: $limit) {
            nodes {
              name
              slug
              databaseId
            }
          }
      }
  `);

 /*  const levelsSchool = useStaticQuery(graphql`
  query ($limit: Int = 100) {
    
  }
`); */

    const [paramsSearchSchool, setParamsSearchSchool] = 
    useState(
        {
            state:{
                value: "ciudad-de-mexico"
            },
            level:{
                value: "secundaria: Secundaria"
            },
            type:{
                value: "público: Público"
            }
        }
        )
    const getStates = () =>{
            fetch(`${process.env.WP_URL_REST}/wp/v2/states?per_page=100`,{
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              .then(response => response.json())
              .then(
                (data) => {
                    const states = data.map(({id, name})=> {return {value:id, label:name}})
                    setStates(states);
                    // console.log(data);
                } 
              )
        .catch((error)=>console.log(error));
    
    }
    useEffect(() => {
        // console.log(State.getStatesOfCountry())
        const dataStates = State.getStatesOfCountry('MX'); 
        const states = dataStates.map(({name})=> {return {field:"state" ,value:name, label:name}})
        setStates(allWpStateSchool.nodes.map((school)=> {return {field:"state" ,value:school.slug, label:school.name}}));  
        inititalParamsSearchLocalStorage();
        // console.log(allWpLevelsSchool);
    },[])
    const inititalParamsSearchLocalStorage = () =>{
        const paramsLocalStorage = typeof window !== "undefined" && JSON.parse(localStorage.getItem('searchSchool'))
        paramsLocalStorage === null && localStorage.setItem('searchSchool', JSON.stringify({state:{value: "ciudad-de-mexico"},level:{value: "secundaria: Secundaria"},type:{value: "público: Público"}} ))
        setParamsSearchSchool({state:{value: "ciudad-de-mexico"},level:{value: "secundaria: Secundaria"},type:{value: "público: Público"}});
    }

    const handleParamToSeach=(params)=>{
        setParamsSearchSchool({
            ...paramsSearchSchool, 
            [params.field]:{
                value:params.value
            }
        })
    }

    useEffect(()=>{
        typeof window !== "undefined" && localStorage.setItem('searchSchool', JSON.stringify(paramsSearchSchool))
    },[paramsSearchSchool])
    /* 
    const dataStates = State.getStatesOfCountry(data.id);        
        const states = dataStates.map(({name})=> {return {value:name, label:name}})
    */
   /*  const handleFormSearch=(e)=>{
        e.preventDefault() 
        if (typeof window !== `undefined`){              
            window.location = '/colegio/busqueda';
      }
    } */

    const optionsType = [
        {field:"type" , value: 'público: Público', label: 'Público'},
        {field:"type" , value: 'privado: Privado', label: 'Privado'},
      ]
      const optionsLevel = [
        { field:"level" , value: 'kínder: Kínder', label: 'Kínder' },
        { field:"level" , value: 'jardín de niños: Jardín de niños', label: 'Jardín de niños' },
        { field:"level" , value: "licenciatura en educación pre-escolar / primaria: Licenciatura en educación pre-escolar / primaria", label: "Licenciatura en educación pre-escolar / primaria" },
        { field:"level" , value: 'maternal: Maternal', label: 'Maternal' },
        { field:"level" , value: 'pre-escolar: Pre-escolar', label: 'Pre-escolar' },
        { field:"level" , value: 'primaria: Primaria', label: 'Primaria' },
        { field:"level" , value: 'secundaria: Secundaria', label: 'Secundaria' },
        { field:"level" , value: 'preparatoria: Preparatoria', label: 'Preparatoria' },
        { field:"level" , value: 'preparatoria abierta: Preparatoria abierta', label: 'Preparatoria abierta' },
        { field:"level" , value: 'bachillerato: Bachillerato', label: 'Bachillerato' },
        { field:"level" , value: 'licenciatura: Licenciatura', label: 'Licenciatura' },
        { field:"level" , value: 'postgrado: Postgrado', label: 'Postgrado' },
        { field:"level" , value: 'carreras técnicas comerciales: Carreras técnicas comerciales', label: 'Carreras técnicas comerciales' },
        { field:"level" , value: 'universidad: Universidad', label: 'Universidad' },
        { field:"level" , value: 'lactantes: Lactantes', label: 'Lactantes' },
        { field:"level" , value: 'guardería: Guardería', label: 'Guardería' },
      ]
  return (
    <section className='section section--findSchool' >
        <div className="section__image--portada" >
            <h1 className='title--h5'>Encuentra rapidamente a tu colegio ideal</h1>
        </div>
        <div className='section__blockSeach' >
            <div /* onSubmit={(e)=>{handleFormSearch(e)}} */  className='blockSearch__content' >
                <div className='form__group'>
                    <label htmlFor='group__label--type' className='group__label'>Tipo</label>
                    <Select onChange={(data)=>{handleParamToSeach(data)}} className="create-select" options={optionsType} />
                </div>
                <div className='form__group'>
                    <label htmlFor='group__label--level' className='group__label'>Nivel</label>
                    <Select onChange={(data)=>{handleParamToSeach(data)}} className="create-select" options={optionsLevel} />
                </div>
                <div className='form__group'>
                    <label htmlFor='group__label--ubication'  className='group__label'>Estado</label>
                    <Select onChange={(data)=>{handleParamToSeach(data)}} className="create-select" options={states} />
                </div>
                <div className='form__group'>
                    <Link type='submit' to={`/mejores-escuelas/${paramsSearchSchool.state.value}`} className='submit--desktop  btn btn--normal btn--primary  '>
                        Buscar
                    </Link>
                    <Link type='submit' to={`/mejores-escuelas/${paramsSearchSchool.state.value}`} className='submit--mobile submit btn--primary' >
                        <StaticImage
                        src="../../static/svg/search.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                        width={18}
                        height={18}
                        />
                    </Link>                        
                </div>
            </div>
        </div>
        <div className='grid--cards' >
            <div className='card'>
                <div className='card__header'>
                    <div  className='icon--secondary' >
                        <StaticImage
                        src="../../static/svg/search-white.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                        width={18}
                        height={18}
                        />
                    </div>
                    <h6 className='title--h6'>
                        Busca
                    </h6>
                </div>
                <div className='card__body'>
                    <p className='paragraph' >
                        Busca entre cientos de opciones disponibles
                    </p>
                </div>
            </div>
            <div className='card'>
                <div className='card__header'>
                    <div  className='icon--secondary' >
                        <StaticImage
                        src="../../static/svg/paper-white.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                        width={18.64}
                        height={24}  
                        />
                    </div>
                    <h6 className='title--h6'>
                        Compara
                    </h6>
                </div>
                <div className='card__body'>
                    <p className='paragraph' >
                        Aplica facilmente filtros, y compara los resultados
                    </p>
                </div>
            </div>
            <div className='card'>
                <div className='card__header'>
                    <div  className='icon--secondary' >
                        <StaticImage
                        src="../../static/svg/check-white.svg"
                        alt="A dinosaur"
                        placeholder="blurred"
                        layout="fixed"
                        width={24}
                        height={24}
                        />
                    </div>
                    <h6 className='title--h6'>
                        Elije
                    </h6>
                </div>
                <div className='card__body'>
                    <p className='paragraph' >
                        Elije y lee los detalles sobre el colegio, contactalos
                    </p>
                </div>
            </div>
        </div>
        <div className='section__carousel ' >
        <GlobalContextProvider>
            
            <SliderHorizontal type={"stars"} title={"Colegios populares en mexico"} />
            <SliderHorizontal type={"favorites"} title={"Cerca de ti"} />
            {/* <SliderHorizontal title={"Cerca de tí"} /> */}
        </GlobalContextProvider>
        </div>
    </section>
  )
}
