import React, { useContext, useEffect, useState } from 'react';
import pic from '../image/image 34.png'
import './Shop.css'
import {useHistory} from 'react-router-dom';
import { UserContext } from '../App';
import Order from '../Oder/Order';
const Shop = (props) => {
  const [newproduct,setnewproduct]=useState([]);
  const [databaseInfo,setDatabaseInfo]=useState([]);
 
  const [LoggedIn, setLoggedIn] =useContext(UserContext);
    const history = useHistory();
//const newproduct=props.product;
    const {name,price}=props.product;
    const Image = props.product.image;
    console.log(Image)
  // console.log(newproduct);
   const id =props.product._id;
 
  
  useEffect(()=>{
    fetch('http://localhost:4000/allProduct')
    .then(res => res.json())
    .then(data => {
      setnewproduct(data);
        
    });
},[])
  const handleButton =(cartId)=>{
  const newId= cartId;
  
  const email= LoggedIn.email;
  const email_uid=LoggedIn.uid
  console.log(newId)
  const filterProduct= newproduct.find(pd => pd._id ===newId);
  console.log(filterProduct)
 
  const myDatabaseinfo={...filterProduct};
  const {name,price,_id}=myDatabaseinfo;
  const newdatabaseinfo={name ,price,email, email_uid}
  console.log(newdatabaseinfo);
  
    history.push(`/cart/${cartId}`);
    const url=`http://localhost:4000/shopProduct`;
      fetch(url,{
        method:'POST',
        headers:{ "content-type": "Application/json"},
        body: JSON.stringify(newdatabaseinfo),
        
       
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
 
    
  }
 
    return (
        <div className='cart-container'>
        <div className='cart-img'>
            <img src={Image} alt="" />
        </div>
        <div className='cart-item'>
         <h3>{name}</h3>
        
         </div> 
         <div className='cart-sub-item'>
         <p><span>tk</span> {price}</p>
         <button onClick={() =>handleButton(id)}>SHOP NOW</button>

         
         </div>
        </div>
    );
};

export default Shop;