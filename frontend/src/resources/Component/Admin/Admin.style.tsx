import styled from "styled-components";


export const Dropdown = styled.div`
height : 300px;
width : 60px;
display: none;
border-radius: 20px;
background:rgb(252, 245, 245);


`;

export const Img = styled.img`
width: 100%;
height: 100%;
border-radius: 50%;
`;

export const Avt = styled.div`
width: 100%;
position: absolute;
height: 40px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Menu = styled.div`
width : 100%;
position: absolute;
height : 240px ;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
`;

export const Menuicon = styled.img`
width : 30px;
height : 40px;
:hover{
    opacity: 0.5;
}
`;




export const Wrapper = styled.div`
cursor: pointer;
margin-right: 14px;
width: 40px;
height : 40px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
&:hover ${Dropdown}{
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

&:hover ${Img}{
    height: 30px;
    width: 30px;
    margin-top: 5px;
    margin-bottom: 20px;
   }   

&:hover ${Avt}{
    border-bottom: 0.3px solid ;
}    
`;



