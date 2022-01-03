import styled from 'styled-components/native';
import { colors } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet, Dimensions } from 'react-native';
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
  justify-content: flex-start;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
  margin-bottom : 30px;
`;


export const Content = styled.View`
  flex: 1;
  margin-left: 25px;
  margin-right: 25px;
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
flex: 1;
margin-left: 20px;
  margin-right: 20px;
`;

export const TextItemContainerValue = styled.Text`
font-size: 14px;
color: #999;
font-family: 'Roboto';

`;
export const InputItemContainerValue = styled.View`
border-bottom-width: 2px;
border-bottom-color: #c2c2c2;  
`;

export const InputValue = styled(TextInputMask).attrs({
  options: {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$ ',
    suffixUnit: '',
  },
  type: 'money',
  placeholderTextColor: "#000",
  placeholder: "R$ 0,00",
})`
font-size: 24px;
color: #000;
font-family: 'Roboto';

`;

export const ContainerTeclado = styled.View`
flex: 3;
margin-bottom: ${windowHeight > 640 ? 20 : 0}%; 
margin-top: ${windowHeight > 640 ? 20 : 0}%;
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
color: #000;
width: 100px;
text-align: center;
font-family: 'Roboto';

`;




export const ContainerButton = styled.View`
flex: 1;
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
