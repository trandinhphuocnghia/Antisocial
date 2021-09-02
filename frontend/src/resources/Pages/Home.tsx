import React from "react";
import 'C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\resources\\main.css'
import { Logo } from "../Component/Logo/Logo";
import { Admin } from "../Component/Admin/Admin";
import image from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\icon.svg"
import avt from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\avt.png"
import { Dropdown } from "../Component/Admin/Admin.style";
import { Link, Route } from "react-router-dom";
import Loginpage from "./Login";
const Homepage = () => {

    return (
        <div className ="home">
    
            <div className = "header" >
                
                <div className = "Logo"> 
                <Link to ="/"><Logo image={image}/></Link>  
                </div>
              
               <div className = "searchbar">
                 <div className="searchicon"></div> 
                 <div className="inputserach"></div>
                 <div className="inputdelete"></div> 
               </div>

               
                   <Admin avt = {avt}/> 
                  
                

            </div>

            <div className = "content">

            </div>

        </div>
    )
}

export default Homepage;