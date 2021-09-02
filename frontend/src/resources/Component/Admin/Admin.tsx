import React from "react";
import { Link } from "react-router-dom";
import {Dropdown, Img, Wrapper,Menu, Menuicon, Avt} from './Admin.style'
import login from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\login-svgrepo-com.svg"
export const Admin = ({avt}:any) => {
    return(
    <Wrapper>
        <Img src = {avt} />
      
        <Dropdown>
        <Avt>
        <Img src = {avt} /> 
        </Avt>    
        
        <Menu>
        <Link to="/login"><Menuicon src = {login}/></Link>
        </Menu>
        </Dropdown>

    </Wrapper>    
    
    
    )
    }