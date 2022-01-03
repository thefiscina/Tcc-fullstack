import styled from 'styled-components/native';
import { colors } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background_principal};
`;

export const Header = styled.View`  
  background: ${colors.background_principal};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
  /* margin-top: 30px; */
  /* margin-bottom : 30px; */
  margin-top: ${windowHeight > 640 ? 30 : 10}px; 

  margin-bottom: ${windowHeight > 640 ? 30 : 10}px; 
`;


export const Content = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;  
`;

export const TitlePage = styled.Text`
  color: #000;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 18px;  
  margin-left: 30px;
`;


export const ArrowFront = styled(Icon).attrs({
  name: 'chevron-right',
})`
  color: #000;
  font-size:20px;
`;

export const ArrowBack = styled(Icon).attrs({
  name: 'chevron-left',
})`
  color: #000;
  font-size: 40px;
`;


export const ContainerValue = styled.View`
  flex: 2;
  margin-left: 25px;
  margin-right: 25px;
`;

export const TextItemContainerValue = styled.Text`
/* font-size: 18px; */
font-size: ${windowHeight > 640 ? 18 : 14}px; 
color: #000;
font-weight: bold;
text-align: center;
margin-top: 25px;
/* padding-top: 30px; */
padding-top: ${windowHeight > 640 ? 30 : 10}px; 
font-family: 'Roboto';


`;
export const InputItemContainerValue = styled.View`
width: 40px;
background-color:  ${colors.background_principal};
border-radius: 10px;
margin: 5px;
`;

export const InputValue = styled(TextInput).attrs({
  placeholderTextColor: "#000",
  maxLength: 1,
  secureTextEntry: true,
})`
font-size: 24px;
color: #000;
text-align: center;
font-family: 'Roboto';

`;


export const LinhaInput = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
margin: ${windowHeight > 640 ? 30 : 0}px; 

`;

export const ContainerTeclado = styled.View`
flex: 3;
margin-left: 25px;
  margin-right: 25px;
`;


export const LinhaTeclado = styled.View`
flex-direction: row;
justify-content: space-around;
align-items: center;
`;

export const ButtonTeclado = styled.TouchableOpacity`
padding: 10px;
margin: 10px;
`;

export const TextButtonTeclado = styled.Text`
font-size: 30px;
/* font-size: ${windowHeight > 640 ? 30 : 20}px;  */
color: #000;
width: 100px;
text-align: center;
font-family: 'Roboto';
`;




export const ContainerButton = styled.View`
flex: 1;
  margin-left: 25px;
  margin-right: 25px;
  /* margin-top: 35px; */
  margin-top: ${windowHeight > 640 ? 35 : 0}px; 

`;


export const ButtonNext = styled.TouchableOpacity`    
width: 100%;
background-color: ${colors.botao_acao};
border-radius: 10px;
margin: 5px;
`;

export const TextButtonNext = styled.Text`
font-weight: 200;
text-align: center;
color: #fff;
padding: 15px;
text-transform: uppercase;
font-family: 'Roboto';
`;


export const ButtonIcon = styled.TouchableOpacity`
position: absolute;
right: 0px;
bottom: 10px;
`;