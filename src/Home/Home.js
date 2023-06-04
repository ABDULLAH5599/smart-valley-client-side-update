import React, { useContext , useEffect, useState  } from 'react';
import { UserContext } from '../App';
import Footer from '../Footer/Footer';
import Shop from '../Shop/Shop';

import './Home.css'
const Home = () => {
    const [product,setproduct]=useState([]);
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
   
    useEffect(()=>{
        fetch('http://localhost:4000/Products')
        .then(res => res.json())
        .then(data => {
            setproduct(data);
            
        });
    },[])
   
    return (
        <div>
          <div>

          <br/>
            <h5 className='text-danger'>{LoggedIn.email}</h5>
            
           
         {
               product.map(pd => <Shop product={pd}></Shop>) 
         }
          </div>


             <div className='footer'>
               
             </div>
        </div>
        
    );
};

export default Home;