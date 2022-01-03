import React, { useEffect, useState } from 'react';
import {
    ArrowBack,
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
    LinhaTeclado,
    TextButtonNext,
    TextButtonTeclado,
    TextItemContainerValue,
    TitlePage
} from './styles';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import ApagarIcon from '../../assets/icons/delete.svg';
import { convertMoney } from '../../../util';


// create a component
const PagamentoScreen = ({ navigation, isFocused }) => {

    const [valor, setValor] = useState();
    const [block, setBlock] = useState(true);
    function init() {

    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);

    useEffect(() => {
        try {
            var novo = navigation.state.params.novo;
            console.log(novo);
            setValor(0);
        } catch (error) {

        }
    }, [navigation.state.params]);


    async function sumValue(value) {
        console.log(value)
        let valor_ = valor;
        if (valor == 'undefined') {
            valor_ = valor_.replace('undefined', '');
        }
        valor_ = await valor_ + value.toString();
        await setValor(convertMoney(valor_));
    }


    async function subValue() {
        let valor_ = valor;
        if (valor == 'undefined') {
            valor_ = valor_.replace('undefined', '');
        }
        valor_ = valor_.toString().substring(0, valor_.toString().length - 1);
        await setValor(convertMoney(valor_));
    }

    useEffect(() => {
        console.log('VALOR', valor);

    }, [valor])

    function avancarDados() {
        if (valor) {
            navigation.navigate('PagamentoCartao', { valor: valor });
        }

    }

    useEffect(() => {
        console.log(valor)
        if (valor == null || valor == "undefined" || valor == "" || valor == "R$ 0,00" || valor == 0) {
            setBlock(true)
        } else {
            setBlock(false)
        }
    }, [valor]);

    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <ArrowBack />
                </TouchableOpacity>
                <TitlePage>Novo Pagamento</TitlePage>
            </Header>
            <ScrollView>
                <Content>
                    <ContainerValue>
                        <TextItemContainerValue>Insira o Valor</TextItemContainerValue>
                        <InputItemContainerValue>
                            <InputValue
                                editable={false}
                                value={valor}
                                onChangeText={(text) =>
                                    setValor(text)
                                }
                            />
                        </InputItemContainerValue>
                    </ContainerValue>

                    <ContainerTeclado>
                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                sumValue(1);
                            }}>
                                <TextButtonTeclado>
                                    1
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(2);
                            }}>
                                <TextButtonTeclado>
                                    2
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(3);
                            }}>
                                <TextButtonTeclado>
                                    3
                                </TextButtonTeclado>
                            </ButtonTeclado>
                        </LinhaTeclado>


                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                sumValue(4);
                            }}>
                                <TextButtonTeclado>
                                    4
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(5);
                            }}>
                                <TextButtonTeclado>
                                    5
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(6);
                            }}>
                                <TextButtonTeclado>
                                    6
                                </TextButtonTeclado>
                            </ButtonTeclado>
                        </LinhaTeclado>

                        <LinhaTeclado>
                            <ButtonTeclado onPress={() => {
                                sumValue(7);
                            }}>
                                <TextButtonTeclado>
                                    7
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(8);
                            }}>
                                <TextButtonTeclado>
                                    8
                                </TextButtonTeclado>
                            </ButtonTeclado>

                            <ButtonTeclado onPress={() => {
                                sumValue(9);
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
                                sumValue(0);
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
                        <ButtonNext style={{ opacity: block ? 0.5 : 1 }} disabled={block} onPress={() => { avancarDados() }}>
                            <TextButtonNext>Avançar</TextButtonNext>
                        </ButtonNext>
                    </ContainerButton>
                </Content>
            </ScrollView>
        </Container>

    );
};

//make this component available to the app
export default connect()(PagamentoScreen)

