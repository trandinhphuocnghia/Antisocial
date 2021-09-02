import React from "react";
import { BrowserRouter,Route, Switch } from "react-router-dom";
import { Activation } from "../resources/Pages/Activation";
import Homepage from "../resources/Pages/Home";
import Loginpage from "../resources/Pages/Login";
import Registerpage from "../resources/Pages/Register";

export  const Routes = () => (

   <BrowserRouter>
    <Switch>
    <Route exact path = "/"  component={Homepage} />
    <Route exact path = "/login"  component={Loginpage} />  
    <Route exact path = "/register" component={Registerpage} />
    <Route exact path ="/user/activate" component = {Activation}/>
    </ Switch>
   </BrowserRouter>
 );
 


