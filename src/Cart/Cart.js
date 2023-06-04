import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../App';
import './Cart.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory 
  } from "react-router-dom";
const Cart = () => {
    let history = useHistory();
    const {cartId} = useParams(); 
  
 //   console.log(history);

    const [cartOrderInfo,setcartOrderInfo]=useState({
    
        name:"",
      contactEmail:'',
        address:'',
        date:''
    });
   // console.log(cartOrderInfo);
    const [ cartProduct, setcartProdcut]=useState([]);
 //   const delteProductId= cartProduct[0]._id;
 //   console.log(cartProduct[0]._id);
    console.log(cartProduct);
    const [ cartUpdateProduct, setcartUpdateProdcut]=useState({});
    console.log(cartUpdateProduct);
   // console.log(cartId);
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
    console.log(LoggedIn)
    const total = cartProduct.reduce((total,product) => total+parseInt(product.price),0)

    useEffect( () =>{
        fetch('http://localhost:4000/allCartProduct')
        .then(res => res.json())
        .then(data => {

            const remaining= data.filter(data => data.email_uid ===LoggedIn.uid);
            //console.log(remaining)
            setcartProdcut(remaining)
          // setcartUpdateProdcut(remaining)
        });
      },[])
 
    //   
    //   setcartProdcut(remainming)
     const handlesubmitOrder = ()=>{
        const {name,contactEmail,address,date}=cartOrderInfo;
        const email=LoggedIn.email;
        const email_uid=LoggedIn.uid
        const totalProduct =cartProduct.length;
        const totalprice = cartProduct.reduce((total,product) => total+parseInt(product.price),0)

        const cartDatabaseVulue={name,contactEmail,address,date,email,totalProduct,totalprice,email_uid}
        console.log(cartDatabaseVulue);
        if(LoggedIn){
            fetch('http://localhost:4000/addPlaceOrder',{
                method:'POST',
                headers:{ "content-type": "Application/json"},
                body: JSON.stringify(cartDatabaseVulue),
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
            })
        }
        
     }
    const handleOrderCart=(e) =>{
        console.log(e.target.name,e.target.value);
         let isValidOrder =true;
         if(e.target.name === 'name'){
            isValidOrder= e.target.value;
         }
        if(e.target.name === 'contactEmail'){
            isValidOrder =e.target.value;
          
        }
        if(e.target.name === 'address'){
            isValidOrder= e.target.value;
        }
        if(e.target.name === 'date'){
            isValidOrder= e.target.value;
        }
        if(isValidOrder){
          const newUser= {...cartOrderInfo};
           newUser[e.target.name]=e.target.value;
           setcartOrderInfo(newUser);

        }
    }
    

    const handleDeleteId = (id) =>{

     
          const url=`http://localhost:4000/deleteCardProduct/${id}`;
          fetch(url,{
            method:'DELETE'
          })
          .then(res => res.json())
          .then(data => {
        console.log(data)
       const remaining2= cartProduct.filter(data => data._id !==id);
       console.log(remaining2)
        setcartProdcut(remaining2)
          })
      
        console.log(id)
      }

    return (
        <div>
            <h3 className='text-danger'>email:{LoggedIn.email} </h3>
            <h3 className='text-danger'>Total Product :{cartProduct.length} </h3>
{/*          
           <p className='cart-item2'>id: ${delteProductId}</p> */}

           
              {
                 cartProduct.map(pdCart =>
                 <div className='cart'><p className='cart-item1'>Procduct Name: {pdCart.name}</p>
                      <p className='cart-item2'>price: ${pdCart.price}</p>
                     
                      <div>
                      <button onClick={() => handleDeleteId(pdCart._id)} type="button" class="btn btn-danger">DELETE</button>
                      </div>
                     
                 </div>) 
              }
              
              <br />
               <br />
               <br />
               <h2 className='total'>Total price :${total}</h2>
               <br />

               < h1 className='text-danger'> Order </h1>
               <br />
               <form 
                class="container form-center">
                    <div  class="form-group ">
                    <input class="form-control" type="text"onChange={handleOrderCart} name="name" placeholder='Enter Your Name'/>
                    </div>
                    <br />
                    <div  class="form-group ">
                    <input class="form-control" type="email"onChange={handleOrderCart} name="contactEmail" placeholder='Enter Your Email'/>
                    </div>
                    <br />
                    <div  class="form-group ">
                    <input class="form-control" type="text"onChange={handleOrderCart} name="address" placeholder='Enter Your address'/>
                    </div>
                    <br />
                 
                
                    <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker form-group " inline="true">
                    <input class="form-control" type="date"onChange={handleOrderCart} name="date" id="" placeholder='Enter date'/>
                   <label for="example">Try me...</label>
                     <i class="fas fa-calendar input-prefix"></i>
                     </div>
                
                  <br />
              <Link to='/orders'>
                <button onClick={()=>handlesubmitOrder()} className='cart-btn'>  PlaceHolder </button>
           </Link>   
           </form>
               
              
               <br />
               <br /> 
               <br /> 
               <br /> 

               <div class="container px-3 my-5 clearfix">
    {/* <!-- Shopping cart table --> */}
    <div class="card">
        <div class="card-header">
            <h2>Shopping Cart</h2>
        </div>
        <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered m-0">
                <thead>
                  <tr>
                    {/* <!-- Set columns width --> */}
                    <th class="text-center py-3 px-4" style={"min-width: 400px;"}>Product Name &amp; Details</th>
                    <th class="text-right py-3 px-4" style={"width: 100px;"}>Price</th>
                    <th class="text-center py-3 px-4" style={"width: 120px;"}>Quantity</th>
                    <th class="text-right py-3 px-4" style={"width: 100px;"}>Total</th>
                    <th class="text-center align-middle py-3 px-0" style={"width: 40px;"}><a href="#" class="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
                  </tr>
                </thead>
                <tbody>
        
                  <tr>
                    <td class="p-4">
                      <div class="media align-items-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="d-block ui-w-40 ui-bordered mr-4" alt=""/>
                        <div class="media-body">
                          <a href="#" class="d-block text-dark">Product 1</a>
                         
                        </div>
                      </div>
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">$57.55</td>
                    <td class="align-middle p-4"><input type="text" class="form-control text-center" value="2"/></td>
                    <td class="text-right font-weight-semibold align-middle p-4">$115.1</td>
                    <td class="text-center align-middle px-0"><a href="#" class="shop-tooltip close float-none text-danger" title="" data-original-title="Remove">×</a></td>
                  </tr>
        
                  <tr/>
                    
                </tbody>
              </table>
            </div>
            {/* <!-- / Shopping cart table --> */}
        
            <div class="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div class="mt-4">
                <label class="text-muted font-weight-normal">Promocode</label>
                <input type="text" placeholder="ABC" class="form-control"/>
              </div>
              <div class="d-flex">
                <div class="text-right mt-4 mr-5">
                  <label class="text-muted font-weight-normal m-0">Discount</label>
                  <div class="text-large"><strong>$20</strong></div>
                </div>
                <div class="text-right mt-4">
                  <label class="text-muted font-weight-normal m-0">Total price</label>
                  <div class="text-large"><strong>$1164.65</strong></div>
                </div>
              </div>
            </div>
        
            <div class="float-right">
              <button type="button" class="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</button>
              <button type="button" class="btn btn-lg btn-primary mt-2">Checkout</button>
            </div>
        
          </div>
      </div>
  </div>
        </div>
    );
};

export default Cart;