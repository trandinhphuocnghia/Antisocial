import React, { useEffect } from 'react';
import 'C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\resources\\main.css'

import Homepage from './resources/Pages/Home';
//import menu  icon component
import {Menuicon} from '../src/resources/Component/Logo/Menuicon'
import { Contenticon } from './resources/Component/Icon/Contenticon';
//import svg icon
import menuicon from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\icons8-menu.svg"
import videoicon from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\video.svg"
import {Routes} from './Route';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import rootReducer from './Redux/reducers';
import axios from 'axios';
import { dispatchToken, GetToken } from './Redux/actions/tokenAction';


function App() {

  const dispatch = useDispatch();
  //connect redux's reducer
  const token = useSelector((state:RootStateOrAny)=>state.token)
  const auth = useSelector((state:RootStateOrAny)=> state.auth)

  //check if logged
  useEffect(() => {
    
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){

      GetToken().then( (res:any) => {

        dispatch(dispatchToken(res))
      })
     
    }
  },[auth.isLogged,dispatch])

  

  return (
    
    <div className = "container">
      
      <div className = "menubar">
        
        <div className="iconmenu">
            <Menuicon  menuicon = {menuicon}/>
        </div>

        <div className = "iconcontent">
           <Contenticon icon = {videoicon}/>
        </div>

       </div>

       <div className="App">
       <Routes/>
      </div>
    </div>
   
  );
}

export default App;
