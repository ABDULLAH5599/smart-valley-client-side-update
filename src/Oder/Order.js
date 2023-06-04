import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import './Order.css';

const Order = () => {
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
    const [order, setorder]=useState([]);
    //const Value=' you did not givbe'
     console.log(order)
    const [orderInfo ,setorderInfo]=useState([]);
    const total = order.reduce((total,product) => total+parseInt(product.price),0)
    useEffect(() => {
        fetch('http://localhost:4000/allCartProduct',{
        })
        .then(res=> res.json())
        .then(data => 
            console.log(data)
            
            );
     
    },[])
    useEffect(() => {
        fetch('http://localhost:4000/placeOrderCartInfo',{
          
        })
        .then(res=> res.json())
        .then(data => {
            const remaining= data.filter(data => data.email_uid ===LoggedIn.uid);
            setorder(remaining)
        });

    },[])
   const handleButtonOrder=(id)=>{
    

    const url=`http://localhost:4000/deleteOrderProduct/${id}`;
    fetch(url,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
  console.log(data)
 const remaining2= orderInfo.filter(data => data._id !==id);
 console.log(remaining2)
 setorder(remaining2)
    })

  console.log(id)

   }
     let isValueIn=LoggedIn&&order&&orderInfo;
     if(isValueIn){
        isValueIn=false;
     }else{
        isValueIn=true;
     }
      
    return (
        <div>
           <div >
               <h1 className='total'>{LoggedIn.email}</h1>
               
            </div>
      
            {
                 order.map(OrderCart =>
                 <div className='cartOrder'>
                      <h1> Total Item :{OrderCart.totalProduct}</h1>
              <h1>Total Price: {OrderCart.totalprice}</h1>

             <h1 className='total'> Order Information</h1>
             <h3> Name: {OrderCart.name}</h3>
             <h3> Contact Email: {OrderCart.contactEmail}</h3>
             <h3> address: {OrderCart.address}</h3>
            <h3> date: {OrderCart.date}</h3>
            <button onClick={() =>handleButtonOrder(OrderCart._id)} className='cart-btn'>  DELETE ORDER </button>
            <button  className='cart-btn2'> <a href='https://buy.stripe.com/test_3cs4iJeXqbmg1c4dQQ'>PAY NOW</a>  </button>
             
                     
                 </div>) 
              }
          
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default Order;