import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/cartSlice";

import "./ProductCard.css";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isItAdded, setIsItAdded] = useState(false);
  const {id, name, price, image } = product;
  const cartList = useSelector(state => state.cartState.cartList);
  useEffect(()=>{
    const productInCard =  cartList.find(item=> item.id === id)
    if(productInCard)
    {
      setIsItAdded(true);
    }else {
      setIsItAdded(false);
    }
  },[cartList, id])
  

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {isItAdded? <button className="remove" onClick={() => dispatch(remove(product))} >Remove</button> :<button onClick={() => dispatch(add(product))} >Add To Cart</button>}        
      </div>
    </div>
  )
}