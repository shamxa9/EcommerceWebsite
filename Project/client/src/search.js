import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import Product from './Product';
import Header from './Header'

function Adminadd(){
    const [products,setproducts]=useState([]);
    //const [product,setproduct]=useState("");
    useEffect(()=>{
        var product=localStorage.getItem("vOneLocalStorage");
        //setproduct(v1);
        console.log(product);
        Axios.post("http://localhost:3001/search/search",{product:product}).then((response)=>{
            setproducts(response.data);
        })
    }, []);
    return (
        <div className="home__row">
                {products.map((val)=>{
                    return <Product
                    id={val.id}
                    title={val.name}
                    price={val.price}
                    image={val.url}
                     />
                    })}
                </div>
    )
}

export default  Adminadd;