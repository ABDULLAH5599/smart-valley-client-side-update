import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from 'react-router-dom';
import './Signup.css';
import firebaseConfig from '../firebase.config';


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
      const Signup = () => {
        //  const [newUser, setnewUser] = useState(false);
          const [user ,setUser]=useState({
              isSignIn:false,
              name:'',
              email:'',
              password:'',
              
            })
            // this is google provider
            const provider = new firebase.auth.GoogleAuthProvider();
            const handleEventInGoogle=()=>{
              console.log('clicked')
              firebase.auth().signInWithPopup(provider)
              .then((result) => {
                 console.log(result);
                 const {displayName,email,photoURL} = result.user;
                 const signInUser={
                   isSignIn:true,
                   name:displayName,
                   email:email,
                   photo:photoURL
                  }
                setUser(signInUser);
                const credential = result.credential;
            
               
                const token = credential.accessToken;
               
                
               
              }).catch((error) => {
               
                console.log(error);
                console.log(error.message);
               
              
              });
            }
         //this is facebook provider
         const fbprovider = new firebase.auth.FacebookAuthProvider();
         //this handleSignInFacebook 
              const handleEventInFacebook =()=>{
           firebase
             .auth()
             .signInWithPopup(fbprovider)
             .then((result) => {
       /** @type {firebase.auth.OAuthCredential} */
       var credential = result.credential;
      
       // The signed-in user info.
       var user = result.user;
      
       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
       var accessToken = credential.accessToken;
      
       // ...
      })
      .catch((error) => {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
      
       // ...
      });
        }
      //================================================================
              //       this is handlesubmit 
          const handlesubmit =(e) =>{
            console.log("right")
       if(user.name && user.email && user.password){
      console.log("right2")
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      console.log(user.name, user.email,user.password)
      .then((userCredential) => {
      console.log(userCredential);
      var user = userCredential.user;
      const newUser ={...user};
      newUser.error ='';
      newUser.success=true;
      updateUserName(user.name);
      setUser(newUser);
      
      // ...
      })
      .catch((error) => {
      const newUser ={...user};
      newUser.error =error.message;
      newUser.success=false;
      setUser(newUser);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
      });
      }
      
      
      e.preventDefault();
      }
      //==================================================
      
      
      //       this is handleformEvent for input tag
      
            const handleformEvent=(e) =>{
              console.log(e.target.name,e.target.value);
               let isValidForm =true;
               if(e.target.name === 'name'){
                isValidForm= e.target.value;
               }
              if(e.target.name === 'email'){
                isValidForm =/\S+@\S+\.\S+/.test(e.target.value);
                
              }
              if(e.target.name === 'password'){
                const isPasswordValid= e.target.value.length > 6 ;
                const passwordNumber = /\d{1}/.test(e.target.value);
                isValidForm=isPasswordValid && passwordNumber;
              }
              if(isValidForm){
                const newUser= {...user};
                 newUser[e.target.name]=e.target.value;
                 setUser(newUser);
              }
          }
      //======================================================
      //       this  is updateUserName
      const updateUserName = name =>{
        const user = firebase.auth().currentUser;
      console.log(user);
          user.updateProfile({
          displayName: name
      
          }).then(function() {
        console.log("update name");
          }).catch(function(error) {
        console.log(error);
        });
      }
      


    return (
        <div>
            {
       user.success && <p style={{color: "green",textAlign:'center'}}> user {user ? 'created successfully' : 'failed'}</p>
     }
             <div  className='Signup-container'>
                <form onSubmit={handlesubmit} className='Signup-cart'>
                <h3>Create an account</h3>
                <input className='Signup-cart-input'onBlur={handleformEvent} type="text" name="name" id="" placeholder="Name" required/>
                <br/>
                <input className='Signup-cart-input'onBlur={handleformEvent} type="email" name="email" id="" placeholder="Email" required/>
                <br/>
                <input className='Signup-cart-input'onBlur={handleformEvent} type="password" name="password" id=""placeholder="Password" required/>
                <br/>
                <input className='Signup-cart-input' type="password" name="" id=""placeholder="Confirm Password" required/>
                
                {/* <div className='Signup-cart-child'>
                    <div className='remember-checkbox'>    
                    <input type="checkbox" name="remember" id=""/>
                    <label htmlFor="remember">Remember Me</label>  
                    </div>
                    <div className='Signup-forget-pass'>
                        <a href="#">Forgot Password</a>
                    </div>
                   
                </div> */}
                <input type="submit" value="submit" className='Signup-btn'/>
              
               
                <div className='Signup-create-account'>
                    <p> Have an account? <Link to='/login'><a href="">Logged In</a></Link></p> 
                  
                </div>
              
                </form>
            
            </div>
           
            <div className='SignupAuto'>
            <p>or</p>
            <br/>
            <button onClick={handleEventInGoogle}>Continue   With   Google</button>
            <br/>
            <button onClick={handleEventInFacebook}>Continue With Facebook</button>
            </div>
       
        </div>
      
    );
};
 
export default Signup;