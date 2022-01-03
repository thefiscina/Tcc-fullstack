import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles';
import logoImage from '../../assets/logos/logo_png.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
  margin-top: 30px;
  margin-bottom : 80px;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 25px;
  margin-right: 25px;
`;



export const ContentHeader = styled.View`
  flex: 1;    
  flex-direction: row;
  align-items: center;
`;




export const ItemHeader = styled.View`
margin: 5px;
`;


export const TextName = styled.Text`
  color: #000;
  font-weight: bold;
  font-family: 'Roboto';
  margin-bottom: 5px;
`;

export const TextLink = styled.Text`
  color: ${colors.botao_acao};
  font-weight: 400;
  font-family: 'Roboto';
  /* text-decoration: underline; */
`;

export const ProfileContainer = styled.View`
width: 45px;
height: 45px;
background-color: red;
border-radius: 50px;
overflow: hidden;
`;


export const PerfilImage = styled.Image`
  align-self: center;  
  width:100%;
  height :100% ;
  align-content  :center ;  
`;

export const ContainerList = styled.View`  
  flex:1;
  width: 95%;
`;

export const ItemList = styled.TouchableOpacity`    
flex-direction: row;
align-items: center;
width: 100%;
justify-content: space-between;
margin-bottom: 20px;
`;

export const Item = styled.View`    
flex-direction: row;
align-items: center;
width: 100%;
justify-content: flex-start;
`;

export const TextItem = styled.Text`
  color: #000;
  font-weight: 300;
  font-family: 'Roboto';
  font-size: 16px;  
  margin-left: 10px;
`;

export const IconContainer = styled.View`    
width: 20px;
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

export const TextTitle = styled.Text`
  color: #999;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 14px;
  margin-bottom: 20px;
  text-transform: uppercase;

`;


export const ContainerClose = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: center;
margin-bottom: 30px;
`;