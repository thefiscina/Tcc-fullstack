import styled from 'styled-components/native';
import { colors } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet } from 'react-native';

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


export const ContainerInfo = styled.View`  
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const TextItemContainerInfo = styled.Text`
font-size: 14px;
color: #000;
font-family: 'Roboto';
font-weight: bold;
`;



export const ContainerRow = styled.View`  
margin: 5px;
`;

export const ContainerSelect = styled.View`
margin: 5px;
`;



export const ItemContainerSelect = styled.TouchableOpacity`
 background-color: ${colors.botao_acao};
 height: 20px;
 width: 20px;
 border-radius: 50px;
`;


export const ItemContainerNotSelect = styled.TouchableOpacity`
 background-color: ${colors.background_principal};
 border: 1px solid ${colors.botao_acao};
 height: 20px;
 width: 20px;
 border-radius: 50px;
`;




export const TextInfo = styled.Text`
font-size: 14px;
color: #000;
font-family: 'Roboto';
font-weight: 300;
`;


export const ContainerSlider = styled.View`
flex: 1;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 60px;

`;


export const LinhaSlider = styled.View`
flex-direction: row;
justify-content:space-between;
align-items: center;
`;

export const TextInfoSlider = styled.Text`
font-size: 14px;
color: #999;
font-family: 'Roboto';
font-weight: 300;
`;


export const ContainerSliderValue = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const TextInfoSliderValue = styled.Text`
font-size: 14px;
color: #000;
font-family: 'Roboto';
font-weight: 300;
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
  margin-top: 60px;
  margin-left: 25px;
  margin-right: 25px;
`;


export const ButtonNext = styled.TouchableOpacity`    
 height: 50px;
  background-color: #07877d;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  color: #fff;
`;

export const TextButtonNext = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  font-family: 'Roboto';
`;




export const ContainerInfoTaxa = styled.View`  
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  margin-top: 40px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const TextItemInfoTaxa = styled.Text`
font-size: 14px;
color: #000;
font-family: 'Roboto';
font-weight: 500;
margin: 2px;
`;


export const ContainerValue = styled.View`
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

export const TextItemContainerValue = styled.Text`
font-size: 14px;
color: #999;
font-family: 'Roboto';

`;
export const InputItemContainerValue = styled.View`
/* border-bottom-width: 2px; */
/* border-bottom-color: #c2c2c2;   */
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