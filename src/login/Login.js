import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { UserContext } from '../App';
import firebaseConfig from '../firebase.config';




const Login = () => {
  //firebase.initializeApp(firebaseConfig)
    const [LogUser ,setLogUser]=useState({
        isSignIn:false,
        name:"",
        email:'',
        password:'',
        photo:'',
        error:''
      })
      const [LoggedIn, setLoggedIn] =useContext(UserContext);
      const history = useHistory();
      const location=useLocation()
      console.log(LogUser)
     
      let { from } = location.state || { from: { pathname: "/" } };
      // this is google provider
      const Gprovider = new firebase.auth.GoogleAuthProvider();
     // this handleSignInGoogle 
      const handleSignInGoogle=()=>{
        console.log('clicked')
        firebase.auth().signInWithPopup(Gprovider)
        .then((result) => {
           console.log(result);
           const {displayName,email,photoURL} = result.user;

           const signInUser={
             isSignIn:true,
             name:displayName,
             email:email,
             photo:photoURL
            }
            setLogUser(signInUser);
            console.log(signInUser)
           // setLoggedIn(signInUser)
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
      const handleSignInFacebook =()=>{
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
//     this is handlesubmit 
const handlesubmitLogin =(e) =>{
     console.log("right")
     console.log(LogUser)

   if(LogUser.email && LogUser.password){
       console.log("clicked")
       console.log(LogUser.name,LogUser.password)
      firebase.auth().signInWithEmailAndPassword(LogUser.email, LogUser.password)
  .then((userCredential) => {
     console.log("clicked")
    var user = userCredential.user;
    const newUser ={...user};
    newUser.error ='';
    newUser.success=true;
    setLogUser(newUser);
    setLoggedIn(newUser);
  //  getJwttoken();
    history.replace(from);
    var user = userCredential.user;
    console.log(userCredential);
    
  })
  .catch((error) => {
    const newUser ={...LogUser};
    newUser.error =error.message;
    newUser.success=false;
    setLogUser(newUser);
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    }
  
  
    e.preventDefault();
  }
  // const getJwttoken=()=>{
  //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  //   .then(function(idToken) {
  //     sessionStorage.setItem('token',idToken);
  //     // console.log(idToken)
  //   }).catch(function(error) {
  //     // Handle error
  //   });
  // }
 //     this is handleformEvent for input tag

const handleformEventLogIn=(e) =>{
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
      const newUser= {...LogUser};
       newUser[e.target.name]=e.target.value;
       setLogUser(newUser);
    }
}

    return (
        <div>
                           {
       LogUser.success && <p style={{color: "green",textAlign:'center'}}> user {LogUser ? 'login successfully' : 'failed'}</p>
     }
            <form onSubmit={handlesubmitLogin} className='login-container'>
                <div  className='login-cart'>
                <h3>Login</h3>
                <input className='cart-input' type="email"onBlur={handleformEventLogIn} name="email" id="" placeholder="Email"/>
                <br/>
                <input className='cart-input' type="password"onBlur={handleformEventLogIn} name="password" id=""placeholder="Password"/>
                <div className='login-cart-child'>
                    <div className='remember-checkbox'>    
                    <input type="checkbox" name="remember" id=""/>
                    <label htmlFor="remember">Remember Me</label>  
                    </div>
                    <div className='forget-pass'>
                        <a href="#">Forgot Password</a>
                    </div>
                </div>
                 <input type="submit" value="Login" className='login-btn'/>
               
                <div className='create-account'>
                    <p>Dont have an account? <Link to='/signup'><a href="">Create an Account</a></Link></p> 
                  
                </div>
              
              
            </div>
            </form>
           
            <div className='AutoSignup'>
            <p>or</p>
            <br/>
            <button onClick={handleSignInGoogle}>Continue With Google</button>
            <br/>
            <button onClick={handleSignInFacebook} >Continue With Facebook</button>
            </div>
      
        </div>
    );
};

export default Login;