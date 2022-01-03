//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import React, { useRef, useState } from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useDispatch } from 'react-redux';
import apiBase from '../../service/api';
import { GET, POST } from '../../service/index';
import { authenticaded, setEstabelecimento, signInSuccess } from '../../store/actions';
import styles from '../../styles';


import {
    Container,
    Logo,
    FormContainer,
    InputContainer,
    Input,
    SubmitButton,
    SubmitButtonText,
    ForgotPasswordButton,
    ForgotPasswordButtonText,
    LogoContainer
} from './styles';

// create a component
const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    // const [cnpj, setCnpj] = useState('35333400000101');
    // const [password, setPassword] = useState('1q2w3e4r5t');

    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const passwordInputRef = useRef();
    const dispatch = useDispatch();

    async function handleSubmit() {
        if (!cnpj || !password) return;

        if (loading) return;

        setLoading(true);

        Keyboard.dismiss();
        const unmaskedcnpj = cnpj.replace(/[^a-z0-9]/gi, '');
        try {
            let obj = {
                "Cnpj": unmaskedcnpj,
                "Senha": md5(password)
            }

            var response = await POST(`Login`, obj).then(async (response) => {
                setLoading(false);
                await AsyncStorage.setItem('@BRR:user', JSON.stringify(response.data));
                await AsyncStorage.setItem('@BRR:token', response.data.Token);
                apiBase.defaults.headers.Authorization = `bearer ${response.data.Token}`;
                dispatch(signInSuccess(response.data.Token, response.data));
                getEstabelecimento();

            }).catch((err) => {
                if (err.response) {
                    console.log(err.response.data); // => the response payload 
                }
                console.log(err)
                setLoading(false);
                Alert.alert('Erro', err.response.data.message, [
                    {
                        text: 'OK',
                    },
                ]);
            });

        } catch (err) {
            setLoading(false);

            Alert.alert('Erro', 'Erro ao realizar login', [
                {
                    text: 'OK',
                },
            ]);
        }
    }


    async function getEstabelecimento() {
        try {

            var response = await GET(`Estabelecimento`);
            setLoading(false);
            if (response.status == 200) {
                await AsyncStorage.setItem('@BRR:estabelecimento', JSON.stringify(response.data));
                dispatch(setEstabelecimento(response.data));
                dispatch(authenticaded(true));
                console.log(response.data)
            } else {
                Alert.alert('Erro', 'Erro ao tentar obter dados', [
                    {
                        text: 'OK',
                    },
                ]);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter dados', [
                {
                    text: 'OK',
                },
            ]);
        }
    }


    function handleCreateAccount() {
        // navigation.navigate('CreateAccount');
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            enabled={Platform.OS === 'ios'}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <Container>
                    <LogoContainer>
                        <Logo />
                    </LogoContainer>
                    <FormContainer>
                        <InputContainer>
                            <TextInputMask
                                type={'cnpj'}
                                style={styles.textInptMaskStyle}
                                placeholderTextColor={"#babcbc"}
                                place
                                placeholder="CNPJ"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={text => setCnpj(text)}
                                value={cnpj}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current.focus()}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input
                                placeholder="Senha"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={text => setPassword(text)}
                                value={password}
                                ref={passwordInputRef}
                                returnKeyType="send"
                                onSubmitEditing={handleSubmit}
                            />
                        </InputContainer>

                        <SubmitButton onPress={handleSubmit}>
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <SubmitButtonText>ACESSAR</SubmitButtonText>
                            )}

                        </SubmitButton>
                        <ForgotPasswordButton
                            onPress={() => navigation.navigate('Help')}
                        >
                            <ForgotPasswordButtonText>
                                Precisa de ajuda?
                            </ForgotPasswordButtonText>
                        </ForgotPasswordButton>
                    </FormContainer>
                </Container>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};


//make this component available to the app
export default LoginScreen;
