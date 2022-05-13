import React,{useState,useEffect} from 'react'
import './Home.css'
import Axios from 'axios'
import Product from './Product'

function Home()
 {
    
    const [pds,setproducts]=useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/home/product").then((response)=>{
            setproducts(response.data);
            console.log(pds)
        })
    }, []);
    
    return (
        <div className='home'>
            <div className="home__container">
                <img
                    className="home__image" 
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />
                <div className="home__row">
                {pds.map((val)=>{
                    return <Product
                    title={val.name}
                    price={val.price}
                    image={val.url}
                    rating={5} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
