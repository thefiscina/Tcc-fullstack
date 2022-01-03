import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background: #2c2e2f91;  

`;

export const Content = styled.View`  
  background: ${colors.background_principal};
  width: 80%;
  height: 250px;
  margin-top: 50%;
  border-radius: 15px;  
  border: 3px solid ${colors.botao_acao};
    /* border-top-start-radius: 40px; */
    /* border-top-end-radius: 25px; */
    /* border-bottom-end-radius: 30px; */
    /* border-bottom-start-radius: 60px; */  
`;


export const Header = styled.View`  
margin:20px;
`;



export const HeaderText = styled.Text`   
  color: #000;
  font-weight: 300;
  font-family: 'Roboto';
  font-size: 18px;    
  text-align: center;  
  margin: 10px;
`;

export const ButtonClose = styled.TouchableOpacity`  
position: absolute;
top: -10px;
right: -10px;
z-index: 10;
`;


export const ContainerSelect = styled.View`  
flex-direction: row;
align-items: center;
justify-content: center;
width: 100%;
text-align: center;
`;



export const ContenButtons = styled.View` 
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


export const ButtonNext = styled.TouchableOpacity`    
width: 50%;
background-color: ${colors.botao_acao};
border-radius: 10px;
margin: 5px;
`;

export const TextButtonHeader = styled.Text`
font-weight: 200;
text-align: center;
color: #fff;
padding: 10px;
text-transform: uppercase;
font-family: 'Roboto';
`;
