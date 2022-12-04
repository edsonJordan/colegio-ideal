import React, {useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import Footer from '../../components/footer'
import Header from '../../components/header'
import GlobalContextProvider, {
    GlobalDispatchContext,
    GlobalStateContext,
  } from "../../context/GlobalContextProvider"



import Mapa from '../../components/mapas/Mapa';
import CardVertical from '../../components/cards/CardVertical';
import axios from 'axios';


export function ShowCardList({data}){
    // const [dataSchools, setDataSchools]= useState(schools)


    return(
        <>
          <div className='container__cards'>  
            <GlobalContextProvider>
                {/* {schools.lenght > 0 ? <HandleSearch schools={schools}/>:"vacio" } */}
                {/* {console.log(data)} */}
            </GlobalContextProvider>
           
           <a className='btn btn--normal btn--secondary' >
                    Cargar mas
            </a>
        </div>
        </>)
        
        
}



export default function States({pageContext}) {
    const {school} = pageContext;
    const [stateAuth, setStateAuth] = useState(typeof window !== "undefined" && JSON.parse(localStorage.getItem('sessionSchool')))
    
    /* Values from params from search */
    const [schools, setSchools]= useState(pageContext.school.colegios.nodes)
    const [typeSearch, setTypeSearch] = useState("grid");
    const [orderFilter,setOrderFilter] = useState("")
    const [typeFilter,setTypeFilter] = useState("")
    const [levelFilter,setLevelFilter]= useState("")
    const [paramsSearch, setParamsSearch]= useState({typeSearch,orderFilter,typeFilter,levelFilter});
    const [countSearchEvent, setCountSearchEvent]=useState(0)

    /* values from Schools */
    const [favorites, setFavorites]=useState([]);
    const [dataIsReady, setDataIsReady ]=useState([])

    const optionsOrderData= [
        { value: '', name:"orderFilter", label: 'Seleccione el tipo de orden' },
        { value: 'punctuation', name:"orderFilter", label: 'Mejor Puntuación' },
        { value: 'favorites', name:"orderFilter", label: 'favoritos' },
    ];
    const optionsTypeData= [
        { value: '', name:"typeFilter", label: 'Seleccione tipo de colegio' },
        { value: 'privado: Privado', name:"typeFilter", label: 'Privado' },
        { value: 'público: Público', name:"typeFilter", label: 'Público' },
    ];
    const optionsLevelsData = [
        { value: '', name:"levelFilter", label: 'Seleccione Un nivel' },
        { value: 'kínder: Kínder', name:"levelFilter", label: 'Kínder' },
        { value: 'jardín de niños: Jardín de niños', name:"levelFilter", label: 'Jardín de niños' },
        { value: 'licenciatura en educación pre-escolar / primaria: Licenciatura en educación pre-escolar / primaria', name:"levelFilter", label: 'Licenciatura en educación pre-escolar / primaria' },
        { value: 'maternal: Maternal', name:"levelFilter", label: 'Maternal' },
        { value: 'pre-escolar: Pre-escolar', name:"levelFilter", label: 'Pre-escolar' },
        { value: 'primaria: Primaria', name:"levelFilter", label: 'Primaria' },
        { value: 'secundaria: Secundaria', name:"levelFilter", label: 'Secundaria' },
        { value: 'preparatoria: Preparatoria', name:"levelFilter", label: 'Preparatoria' },
        { value: 'preparatoria abierta: Preparatoria abierta', name:"levelFilter", label: 'Preparatoria abierta' },
        { value: 'bachillerato: Bachillerato', name:"levelFilter", label: 'Bachillerato' },
        { value: 'licenciatura: Licenciatura', name:"levelFilter", label: 'Licenciatura' },
        { value: 'postgrado: Postgrado', name:"levelFilter", label: 'Postgrado' },
        { value: 'carreras técnicas comerciales: Carreras técnicas comerciales', name:"levelFilter", label: 'Carreras técnicas comerciales' },
        { value: 'universidad: Universidad', name:"levelFilter", label: 'Universidad' },
        { value: 'lactantes: Lactantes', name:"levelFilter", label: 'Lactantes' },
        { value: 'guardería: Guardería', name:"levelFilter", label: 'Guardería' },
      ];
    
    /* const showSchoolsWithParamts=()=>{
    } */

    useEffect(()=>{         
        getSchoolsFavorite()    
                setSchools(schools.map((element)=>{
                    return {
                        id_post: element.databaseId,       
                        levels: element.customFieldColegio.level.map(element=>element.split(":")).map(element=>element[1]).map(element=>element.trim()),
                        nameSchool:element.title,
                        opinion:"buen trato economico",
                        phone:element.customFieldColegio.phone,
                        price: element.customFieldColegio.price,
                        slug:element.slug,
                        stars:"3.6",
                        typeSchool:element.customFieldColegio.type.split(":")[1].trim(),
                        ubication:null,
                        web:element.customFieldColegio.web,
                        whatsapp:element.customFieldColegio.whatsapp,
                        isFavorite:false
                    }
                }))
         
        
    },[])
    const getSchoolsFavorite = ()=>{
        if (stateAuth === null) return setFavorites([]);
        // console.log(stateAuth);
        fetch(`${process.env.WP_URL_REST}/apischool/v1/favorites/${stateAuth.username}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${stateAuth.token}`
          }
        })
        .then(response => response.json())
        .then(
          (data) => {
            setFavorites(data.map((element)=> {return [element.id_post]}).reduce((acc, id_post)=>{ return acc.concat(parseInt(id_post)) },[]));    
            // console.log(data);
          } 
        )
        .catch((error)=>console.log(error));  
    }

    const hiddenCard= (idPost)=>{
        if(idPost !== undefined){
            let post = document.getElementById(idPost);
            post.classList.remove('none')
        }
    }
    const hiddenGroup= (groupCards)=>{
       groupCards.forEach(({id_post}) => {
        let post = document.getElementById(id_post);
            post.classList.add('none');
       });
    }
    const filtersSchools=(arrayToFilter, {typeSearch, levelFilter, typeFilter, orderFilter}, countEvent)=>{
        let schoolsFiltered =[...arrayToFilter]
        
        if(typeFilter !== ""){
            const typeValue = typeFilter.split(':')[1].trim()
            // console.log(typeValue);
            schoolsFiltered = schoolsFiltered.filter(element=>element.typeSchool === typeValue) 
        }
        if(levelFilter !== ""){
            const levelValue = levelFilter.split(':')[1].trim()
            schoolsFiltered = schoolsFiltered.filter((element)=> element.levels.includes(levelValue)) 
        }
        if(orderFilter === "favorites"){           
            //    schoolsFiltered.map(element=>console.log(element));
            schoolsFiltered = schoolsFiltered.filter((element)=> element.isFavorite) 
        }
        if(typeSearch === "grid"){
            if(countEvent>0) hiddenGroup(arrayToFilter)
            schoolsFiltered.map(element=> hiddenCard(element.id_post))
        }
        /* if(countEvent>0) hiddenGroup(arrayToFilter)
        schoolsFiltered.map(element=> hiddenCard(element.id_post)) */
    }
    useEffect(()=>{
        // console.log(paramsSearch);
        setCountSearchEvent(countSearchEvent + 1)
        filtersSchools(dataIsReady,paramsSearch, countSearchEvent)
    },[paramsSearch])
   
    useEffect(()=>{
        setDataIsReady(schools.map((element)=>{ return favorites.includes(element.id_post)? {...element, isFavorite:true}:{...element}})     )
    },[favorites])
    useEffect(()=>{

    }, [dataIsReady])


    /* Functions events favorites Schools */
    const addPostFavorite = (idPost, user_name)=>{
        const data = {
          "user": user_name,
          'post':idPost 
          }; 
          axios.post(`${process.env.WP_URL_REST}/apischool/v1/favorites`, JSON.stringify(data),
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${stateAuth.token}`
                }
            }
          )
          .then((response)=>{
            setDataIsReady(dataIsReady.map(element=>{return element.id_post === idPost ? {...element, isFavorite:true} : {...element}}))
            })
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
              'Authorization':`Bearer ${stateAuth.token}`
            }
          }
          )
          .then((response)=>{
            setDataIsReady(dataIsReady.map(element=>{return element.id_post === idPost ? {...element, isFavorite:false} : {...element}}))
            // console.log(dataIsReady)
        })
          .catch(({response})=>{ console.log(response)});        
    }


    const setIdPost =  (idPost, isFavorite)=>{
        if(isFavorite){
         stateAuth === null ? (window.location= '/login'): addPostFavorite(idPost, stateAuth.username);          
        }else{
          deletePostFavorite(idPost,stateAuth.username)
          // console.log(idPost,stateAuth.data.username);
        }
    }
    const handleEventTypeSearch=(event)=>{
        // console.log(event.target.name);
        setParamsSearch ({...paramsSearch, [event.target.name]:event.target.value})
    }


    const  handleEventSearch = async (event) => {
        // console.log(event.value);
         setParamsSearch ({...paramsSearch, [event.name]:event.value})
         /* let dataFiltered = [...dataIsReady];
        // console.log(event.value);
        // const parst
        console.log(dataFiltered.map(element=>element.levels));
        if(event.value != ""){
            // dataFiltered = dataFiltered.filter(element=> element.levels.includes("kínder: Kínder"))
        }
        console.log(dataFiltered); */
    }
  return (
    <main className='main'>
        <GlobalContextProvider>
            <Header/>
        </GlobalContextProvider>
        <section className='section section--search-school'>
            <h1 className='title--h4'>
                Las mejores escuelas en {school.name}
            </h1>
            <form className='form-search'>
                <div className='form__block'>
                    <input type="radio" defaultChecked name='typeSearch' onClick={handleEventTypeSearch} id="resultados"  value="grid"/>
                    <label htmlFor="resultados" >Resultados</label>
                </div>
                <div className='form__block'>
                    <input type="radio" name='typeSearch' id="mapa" onClick={handleEventTypeSearch}  value="mapa"/>
                    <label htmlFor="mapa" >Mapa</label>
                </div>
            </form>

           
                { 
                    paramsSearch.typeSearch == "grid"
                    ? 
                    <>
                     <form className='form-paramts' >
                            <div className='form-paramats__content' >
                                <div className='form__block' >
                                    <label htmlFor="selectOrder" >Ordenado por</label>
                                    <Select
                                        options={optionsOrderData}
                                        onChange={handleEventSearch}
                                    />
                                </div>
                                <div className='form__block' >
                                    <label htmlFor="selectType" >Tipo</label>
                                        <Select 
                                        onChange={handleEventSearch}
                                        name="typeFilter"
                                        id='selectType'
                                        options={optionsTypeData} />
                                </div>
                                
                                <div className='form__block' >
                                    <label htmlFor="selectLevel" >Nivel</label>                        
                                    <Select
                                            options={optionsLevelsData}
                                            name="levelFilter" 
                                            onChange={handleEventSearch}  
                                            id='selectLevel'  
                                            aria-label="Default select example"
                                        />
                                </div>
                            </div>
                        </form>
                        
                        <div className='grid  sm:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4	carousel--container' >
                            {dataIsReady.map((element,index) =>{   
                                return element.isFavorite !== undefined && <CardVertical  key={index}  isFavorite={element.isFavorite} setIdPost={setIdPost} school={element}/>; 
                                })}
                        </div>
                    </>
                    
                    :
                    <Mapa data={dataIsReady} />
                }
                                 
                
                
        </section>
        <Footer/>
    </main>
  )    
}
