import Axios from "axios";
import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({title, image, price, rating,id}) {
  
  const [{basket},dispatch] = useStateValue();
  
  console.log("this is the basket",basket)
  const addToBasket = () => {
    const cid=localStorage.getItem("abc");
    Axios.post("http://localhost:3001/check/customer",{cid:cid}).then((response)=>{
        if(response.data.length>0)
        {
          Axios.post("http://localhost:3001/add/cart",{cid:cid,price:price})
        }
        else
        {
          Axios.post("http://localhost:3001/add/customer",{cid:cid});
          Axios.post("http://localhost:3001/add/cart",{cid:cid,price:price});

        }
    })
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })
  }
  
  return (
    
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
            {Array(rating).fill().map((_,i)=>(
                <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
