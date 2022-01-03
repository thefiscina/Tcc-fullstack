import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles';


export const Container = styled.View`
  flex: 1;
  background: #fff;
`;


export const Header = styled.View`  
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;  
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;  
`;

export const ItemHeader = styled.View`
  
`;

export const TextHeader = styled.Text`
font-size: 15px;
text-transform: uppercase;
font-weight: 400;
color: #000;
margin-bottom: 5px;
font-family: 'Roboto';
`;

export const TextValue = styled.Text`
font-size: 30px;
font-weight: bold;
margin-right: 15px;
font-family: 'Roboto';
`;

export const ItemValueHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;  
  align-items: center;
`;

export const ContainerIcon = styled.TouchableOpacity`
  width: 25px;
  height: 25px;  
`;

export const ContainerButtonsHeader = styled.View`
flex-direction: row;
  justify-content: center;  
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;


export const ButtonHeader = styled.TouchableOpacity`    
width: 50%;
background-color: ${colors.botao_acao};
border-radius: 10px;
margin: 5px;
`;

export const TextButtonHeader = styled.Text`
font-weight: 200;
text-align: center;
color: #fff;
padding: 15px;
text-transform: uppercase;
font-family: 'Roboto';
`;


export const Content = styled.View`
  flex: 1;
  flex-direction: column;  

`;

export const ContainerTabs = styled.View`  
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-left: 20px;
margin-right: 20px;
margin-top: 10px;
margin-bottom: 10px;
`;

export const TabsSelect = styled.View`  
flex-direction: row;
justify-content: flex-start;
`;


export const Tabs = styled.TouchableOpacity`  
padding: 10px;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const TextTab = styled.Text`
font-weight: 200;
text-align: center;
color: #999;
text-transform: uppercase;
font-size: 13px;
font-family: 'Roboto';
`;

export const ContainerView = styled.View`
  padding: 0 30px;
  width: 100%;
  background-color: ${colors.background_principal};
  flex: 2;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding-top: 30px;
  padding-bottom: 10px;
`;


export const TitleContainer = styled.Text`
font-weight:bold;
color: #000;
text-transform: capitalize;
font-size: 20px;
padding-bottom: 10px;
font-family: 'Roboto';
`;

export const ContainerList = styled.View`
flex: 2;
`;


export const RowList = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 25px;
`;

export const ItemRow = styled.View`
flex-direction: row;
align-items: center;
`;

export const IconRow = styled.View`
margin-right:15px;
width: 35px;
height: 35px;
`;

export const InfoRow = styled.View`

`;

export const NameTextRow = styled.Text`
font-size: 16px;
font-weight: bold;
font-family: 'Roboto';
color: #000;
`;

export const DateTextRow = styled.Text`
font-size: 13px;
font-weight: 800;
font-family: 'Roboto';
color: #999;
`;

export const ValueRow = styled.View`

`;

export const ValueTextRow = styled.Text`
font-size: 14px;
font-weight: bold;
font-family: 'Roboto';
color: #000;
`;


export const BorderSelected = styled.View`
width: 35px;
height: 3px;
background-color: ${colors.botao_acao};
border-radius: 10px;
margin-top: 5px;
`;