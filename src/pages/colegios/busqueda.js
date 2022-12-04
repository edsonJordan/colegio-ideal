import React, {  useState } from 'react';
import Footer from '../../components/footer'
import Header from '../../components/header'
import GlobalContextProvider from '../../context/GlobalContextProvider'

/* import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; */
import CardHorizontal from '../../components/cards/CardHorizontal';
import Mapa from '../../components/mapas/Mapa';

export function showCardList({typeSearch}){
    // console.log(typeSearch);
    return(
        <div className='container__cards'>            
           <div className='content__cards'>
                <CardHorizontal/>
                <CardHorizontal/>
                <CardHorizontal/>
                <CardHorizontal/>
                <CardHorizontal/>
                <CardHorizontal/>
                <CardHorizontal/>                
           </div>
           <a className='btn btn--normal btn--secondary' >
                    Cargar mas
            </a>
        </div>
        )
}


export default function Busqueda() {
    const [typeSearch, setTypeSearch] = useState("resultados");
    const [orderFilter,setOrderFilter] = useState("assessment")
    const [typeFilter,setTypeFilter] = useState("publico")
    const [levelFilter,setLevelFilter]= useState("primaria")
    const [paramsSearch, setParamsSearch]= useState({typeSearch,orderFilter,typeFilter,levelFilter});
    const handleSearch=(event)=>{
        setParamsSearch({...paramsSearch, [event.target.name]:event.target.value})
    }
    
    /* useEffect(()=>{
        console.log(paramsSearch);
    },[paramsSearch]) */


  return (
    <main className='main'>
        <GlobalContextProvider>
            <Header/>
        </GlobalContextProvider>
        <section className='section section--search-school'>
            <h1 className='title--h4'>
                Las mejores escuelas en Ciudad de México 
            </h1>
            <form className='form-search'>
                <div className='form__block'>
                    <input type="radio" defaultChecked name='typeSearch' onClick={handleSearch} id="resultados"  value="resultados"/>
                    <label htmlFor="resultados" >Resultados</label>
                </div>
                <div className='form__block'>
                    <input type="radio" name='typeSearch' id="mapa" onClick={handleSearch}  value="mapa"/>
                    <label htmlFor="mapa" >Mapa</label>
                </div>
            </form>

            <form className='form-paramts' >
                <div className='form-paramats__content' >
                    <div className='form__block' >
                        <label htmlFor="selectOrder" >Ordenado por</label>
                        <div className='container--select'>
                            <select className='input--select' name='orderFilter' id='selectOrder' onChange={handleSearch}  /* defaultValue="assessment" */  aria-label="Default select example">
                                <option value="assessment">Mejor valorado</option>
                                <option value="punctuation">Mejor puntación</option>
                                <option value="3">Secundaria</option>
                            </select>
                        </div>
                    </div>
                    <div className='form__block' >
                        <label htmlFor="selectType" >Tipo</label>
                        <div className='container--select'>
                            <select className='input--select' name="typeFilter" onChange={handleSearch}  id='selectType' aria-label="Default select example">
                                <option value="publico">Público</option>
                                <option value="privado">Privado</option>
                            </select>
                        </div>
                    </div>
                    <div className='form__block' >
                        <label htmlFor="selectLevel" >Nivel</label>
                        <div className='container--select'>
                        <select className='input--select' name="levelFilter" onChange={handleSearch}  id='selectLevel'  aria-label="Default select example">
                            <option value="primaria">Primaria</option>
                            <option value="secundaria">Secundaria</option>
                            <option value="bachiller">Bachiller</option>
                        </select>
                        </div>
                    </div>
                </div>
            </form>
            {
                paramsSearch.typeSearch === "mapa" ? <Mapa params={paramsSearch} /> :showCardList(paramsSearch)
                
            }            
        </section>
        <Footer/>
    </main>
  )    
}
