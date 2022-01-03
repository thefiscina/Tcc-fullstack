import React, { useEffect, useState } from 'react';
import {
    ArrowBack,
    ButtonIcon,
    ButtonNext,
    ButtonTeclado,
    Container,
    ContainerButton,
    ContainerTeclado,
    ContainerValue,
    Content,
    Header,
    InputItemContainerValue,
    InputValue,
    LinhaInput,
    LinhaTeclado,
    TextButtonNext,
    TextButtonTeclado,
    TextItemContainerValue,
    TitlePage
} from './styles';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import ApagarIcon from '../../assets/icons/delete.svg';
import QrIcon from '../../assets/icons/qr-code.svg';
import { Logo } from '../pagamento-cartao/styles';
import { POST } from '../../service';
import md5 from 'md5';


// create a component
const PainelSenhaScreen = ({ navigation, isFocused }) => {

    const [digito1, setDigito1] = useState("");
    const [digito2, setDigito2] = useState("");
    const [digito3, setDigito3] = useState("");
    const [digito4, setDigito4] = useState("");

    const [cartao, setCartao] = useState();
    const [valorMonetario, setValorMonetario] = useState(0);
    const [loading, setLoading] = useState(false);
    const [block, setBlock] = useState(true);

    function init() {
        const { cartao, valor } = navigation.state.params;        
        try {
            var novo = navigation.state.params.novo;
            console.log(novo);
            setDigito1('');
            setDigito2('');
            setDigito3('');
            setDigito4('');
        } catch (error) {

        }
        setCartao(cartao);
        setValorMonetario(valor);
    }

    function handlerPagar() {

        if (!digito1 || !digito2 || !digito3 || !digito4) {
            return;
        }

        var senha = `${digito1}${digito2}${digito3}${digito4}`;

        let obj = {
            "Valor": parseFloat(valorMonetario.replace('R$', '').replace(/[.*+?^${}()|[\]\\]/g, '').replace(",", ".").trim()) * 100,
            "NumeroCartao": cartao,
            "SenhaCartao": md5(senha),
            "CodigoTransacao": md5(Math.floor(Math.random() * 100000000).toString())
        }
        sendPagamento(obj);
    }

    async function sendPagamento(obj) {
        setLoading(true)
        console.log(obj)
        try {
            var response = await POST(`Pagamento`, obj).then(async (response) => {
                navigation.navigate('Sucesso', { dado: response.data });
            }).catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(JSON.stringify(err.response.data));
                }
                console.log(err)
                setLoading(false);
                Alert.alert('Erro', err.response.data.message, [
                    {
                        text: 'OK',
                    },
                ]);
            });
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar realizar pagamento', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);


    useEffect(() => {
        if (!digito1 || !digito2 || !digito3 || !digito4) {
            setBlock(true)
        } else {
            setBlock(false)
        }
    }, [digito1, digito2, digito3, digito4]);

    function setValuePassWord(dado) {
        var value = dado.toString();
        console.log(value)
        if (digito1 == null || digito1 == "") {
            setDigito1(value);
        } else
            if (digito2 == null || digito2 == "") {
                setDigito2(value);
            } else
                if (digito3 == null || digito3 == "") {
                    setDigito3(value);
                } else
                    if (digito4 == null || digito4 == "") {
                        setDigito4(value);
                    }
    }


    function subValue() {
        if (digito4 != null && digito4 != "") {
            setDigito4("");
        } else
            if (digito3 != null && digito3 != "") {
                setDigito3("");

            } else
                if (digito2 != null && digito2 != "") {
                    setDigito2("");

                } else
                    if (digito1 != null && digito1 != "") {
                        setDigito1("");

                    }
    }

    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <ArrowBack />
                </TouchableOpacity>
                <Logo />

            </Header>
            <ScrollView>
                <Content>
                    <ContainerValue>
                        <TextItemContainerValue>Informe a senha do cartão</TextItemContainerValue>
                        <LinhaInput>
                            <InputItemContainerValue>
                                <InputValue
                                    editable={false}
                                    value={digito1.toString()}
                                    onChangeText={(text) =>
                                        setDigito1(text)
                                    }
                                />
                            </InputItemContainerValue>

                            <InputItemContainerValue>
                                <InputValue
                                    editable={false}
                                    value={digito2.toString()}
                                    onChangeText={(text) =>
                                        setDigito2(text)
                                    }
                                />
                            </InputItemContainerValue>


                            <InputItemContainerValue>
                                <InputValue
                                    editable={false}
                                    value={digito3.toString()}
                                    onChangeText={(text) =>
                                        setDigito3(text)
                                    }
                                />
                            </InputItemContainerValue>

                            <InputItemContainerValue>
                                <InputValue
                                    editable={false}
                                    value={digito4.toString()}
                                    onChangeText={(text) =>
                                        setDigito4(text)
                                    }
                                />
                            </InputItemContainerValue>
                        </LinhaInput>
                    </ContainerValue>

                    <ContainerTeclado>
                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                setValuePassWord(1);
                            }}>
                                <TextButtonTeclado>
                                    1
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(2);
                            }}>
                                <TextButtonTeclado>
                                    2
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(3);
                            }}>
                                <TextButtonTeclado>
                                    3
                                </TextButtonTeclado>
                            </ButtonTeclado>
                        </LinhaTeclado>


                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                setValuePassWord(4);
                            }}>
                                <TextButtonTeclado>
                                    4
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(5);
                            }}>
                                <TextButtonTeclado>
                                    5
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(6);
                            }}>
                                <TextButtonTeclado>
                                    6
                                </TextButtonTeclado>
                            </ButtonTeclado>
                        </LinhaTeclado>

                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                setValuePassWord(7);
                            }}>
                                <TextButtonTeclado>
                                    7
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(8);
                            }}>
                                <TextButtonTeclado>
                                    8
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(9);
                            }}>
                                <TextButtonTeclado>
                                    9
                                </TextButtonTeclado>
                            </ButtonTeclado>

                        </LinhaTeclado>

                        <LinhaTeclado>
                            <ButtonTeclado disabled={true}>
                                <TextButtonTeclado>
                                    -
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                setValuePassWord(0);
                            }}>
                                <TextButtonTeclado>
                                    0
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                subValue();
                            }}>
                                <TextButtonTeclado style={{ marginLeft: 5 }}>
                                    <ApagarIcon width={20} height={20} />
                                </TextButtonTeclado>
                            </ButtonTeclado>
                        </LinhaTeclado>
                    </ContainerTeclado>
                    <ContainerButton>
                        <ButtonNext style={{ opacity: block ? 0.5 : 1 }} disabled={block} onPress={() => {
                            handlerPagar()
                        }}>

                            {
                                loading ?

                                    <ActivityIndicator color="#c2c2c2" size="small" />

                                    :
                                    <TextButtonNext>Confirmar</TextButtonNext>

                            }
                        </ButtonNext>
                    </ContainerButton>
                </Content>
            </ScrollView>
        </Container>

    );
};

//make this component available to the app
export default connect()(PainelSenhaScreen)

