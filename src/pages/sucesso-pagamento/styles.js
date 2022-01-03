import { Image, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles';
import logoImage from '../../assets/logos/logo_png.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;



export const Header = styled.View`
  margin-left: 25px;
  margin-right: 25px;
  margin-top: ${windowHeight > 640 ? 30 : 10}px; 
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  

`;

export const ContentHeader = styled.View`
  
`;

export const TextH1 = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto';
  margin: 5px;
`;


export const TextInfo = styled.Text`
  font-size:14px;
  font-family: 'Roboto';
  color: #999;
  font-weight: 300;
  margin: 5px;
`;


export const ButtonIcon = styled.TouchableOpacity`

`;


export const Painel = styled.View`  
  margin-top: ${windowHeight > 640 ? 30 : 10}px; 
  margin-left: 35px;
  margin-right: 35px;
`;

export const ContentPainel = styled.View`
  border-width: 1px;
  border-color: #999;  
  border-radius: 10px;
  padding: 10px;
`;

export const RowContentPainel = styled.View`
 margin: 15px;
`;


export const TextH1Painel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto';
  margin: 5px;
`;


export const TextInfoPainel = styled.Text`
  font-size:14px;
  font-family: 'Roboto';
  color: #999;
  font-weight: 300;
  margin: 5px;
`;

export const RowContentPainelValue = styled.View`
 margin: 5px;
`;


export const TextValue = styled.Text`
   font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto';
  margin: 5px;
  color: #000;
  text-align: center;
`;


export const ContentSends = styled.View`  
  margin-top:  ${windowHeight > 640 ? 20 : 0}px; 
  margin-left: 35px;
  margin-right: 35px;
`;

export const RowContentSends = styled.TouchableOpacity`
 flex-direction: row;
 align-items: center; 
 margin: 2px;
`;

export const TextSend = styled.Text`
   font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto';
  margin: 5px;
  color: #000;
  text-align: center;
  margin-left: 10px;
`;


export const ContenButtons = styled.View` 
  margin-left: 35px;
  margin-right: 35px;
  margin-top: ${windowHeight > 640 ? 50 : 0}px; 
`;


export const ButtonNext = styled.TouchableOpacity`    
width: 100%;
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
