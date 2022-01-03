import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

import logoImage from '../../assets/logos/logo_png.png';
import { colors } from '../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background_principal};
  justify-content: center;
`;


export const LogoContainer = styled.View`  
  width: 100%;  
  flex: 2;  
  align-items: center;
  align-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logoImage,
})`
  align-self: center;  
  width: 200px;
  height: 26px;
  align-content  :center ;
  margin-top: 60%;
`;

export const FormContainer = styled.View`
  padding: 0 30px;
  width: 100%;
  background-color: #fff;
  flex: 1;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding-top: 30px;
  padding-bottom: 80px;
`;



export const InputTitle = styled.Text`
  color: #999;
  font-weight: bold;
  font-family: 'Roboto';
`;

export const InputContainer = styled.View`
  flex-direction: row;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom-color: #cacccc;  
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#babcbc',
})`
  height: 48px;
  font-size: 17px;
  color: #000;
  flex: 1;  
`;


export const EnvelopeIcon = styled(Icon).attrs({
  name: 'mail-outline',
})`
  color: #999;
  font-size: 20px;
`;

export const LockIcon = styled(Icon).attrs({
  name: 'eye',
})`
  color: #000;
  font-size: 20px;
`;

export const LockIconSlash = styled(Icon).attrs({
  name: 'eye-off',
})`
  color: #999;
  font-size: 20px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  background-color: #07877d;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  color: #fff;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  font-family: 'Roboto';
  /* letter-spacing: 2.8px; */
`;

export const NewAccountButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #00f5ff;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const NewAccountButtonText = styled.Text`
  color: #100f12;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2.8px;
  font-family: 'Roboto';
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin: 30px 0 50px;
  align-items: center;
`;

export const ForgotPasswordButtonText = styled.Text`
  color: #1a9087;
  font-size: 16px;
  font-family: 'Roboto';
`;
