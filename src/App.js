import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header/Header';
import Home from './Home/Home';
import Order from './Oder/Order';
import Admin from './Admin/Admin';
import Login from './login/Login';
import Notfound from './Notfound/Notfound';
import Signup from './Signup/Signup';
import Cart from './Cart/Cart'
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Shop from './Shop/Shop';
import Footer from './Footer/Footer';
export const UserContext= createContext()
function App() {
  const [LoggedIn, setLoggedIn]= useState({});
//  const [productinfo,setproductinfo]=useState({})
  return (
    <UserContext.Provider value={[LoggedIn, setLoggedIn] }>
   
     <Router>
       <Header></Header>
        <Switch>
          <Route exact path="/home">
         <Home></Home>
          </Route>
          <PrivateRoute path="/orders">
          <Order></Order>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/cart/:id">
           <Cart></Cart>
          </PrivateRoute>
          {/* <PrivateRoute path="/shop">
           <Shop></Shop>
          </PrivateRoute> */}
      <Route path="/login">
           <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route exact path="/">
          <Home></Home>
          </Route>
          {/* <Route path="/sifatProduct/:key">
              <Productdetail></Productdetail>
          </Route> */}
        <Route path="*">
        <Notfound></Notfound>
        </Route>
        </Switch>
     
     
      </Router>
    </UserContext.Provider>




  );
}

export default App;
