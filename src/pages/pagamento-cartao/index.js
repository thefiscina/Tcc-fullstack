import React, { useEffect, useState } from 'react';
import {
    ArrowBack,
    ButtonIcon,
    ButtonNext,
    ButtonTeclado,
    Container,
    ContainerButton,
    ContainerLeitorQrCode,
    ContainerTeclado,
    ContainerValue,
    Content,
    Header,
    InputItemContainerValue,
    InputValue,
    LeitorQrCodeView,
    LinhaTeclado,
    TextButtonNext,
    TextButtonTeclado,
    TextItemContainerValue,
    TitlePage
} from './styles';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import ApagarIcon from '../../assets/icons/delete.svg';
import QrIcon from '../../assets/icons/qr-code.svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


// create a component
const PagamentoCartaoScreen = ({ navigation, isFocused }) => {

    const [valor, setValor] = useState('');
    // const [valor, setValor] = useState('4835542028769040');

    const [valorMonetario, setValorMonetario] = useState(0);
    const [hasValue, setValueQrCode] = useState(false);
    const [cardValue, setCardValue] = useState("");
    const [lerQrCode, setLerQrcode] = useState(false);
    const [block, setBlock] = useState(true);
    function init() {
        const { valor } = navigation.state.params;
        try {
            var novo = navigation.state.params.novo;
            console.log(novo);
            setValor('');
        } catch (error) {

        }
        console.log(valor);
        setValorMonetario(valor)
    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);


    function sumValue(value) {
        let valor_ = valor;
        valor_ = valor_ += value.toString();
        setValor(valor_);
    }


    function subValue() {
        let valor_ = valor;
        valor_ = valor_.toString().substring(0, valor_.toString().length - 1);
        setValor(valor_);
    }

    function avancarSenha() {
        if (valor) {
            navigation.navigate('PainelSenha', { cartao: valor, valor: valorMonetario });
        }
    }

    async function onSuccess(e) {
        try {
            if (e.data) {
                await setValor(e.data);
                if (e.data == null || e.data == "undefined" || e.data == "" || e.data == 0 || e.data.toString().length != 16) {
                } else {
                    avancarSenha();
                }
                setLerQrcode(!lerQrCode)
            } else {
                alert("QrCode inválido favor tentar novamente");
            }
        } catch (error) {
            alert("QrCode inválido favor tentar novamente");
        }
    };

    useEffect(() => {
        if (valor == null || valor == "undefined" || valor == "" || valor == 0 || valor.toString().length != 16) {
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

                        <TextItemContainerValue>Insira o número do cartão</TextItemContainerValue>
                        <InputItemContainerValue>
                            <InputValue
                                editable={false}
                                value={valor}
                                onChangeText={(text) =>
                                    setValor(text)
                                }
                                maxLength={19}
                            />
                            <ButtonIcon onPress={() => {
                                setLerQrcode(!lerQrCode)
                            }} >
                                <QrIcon width={20} height={20} />
                            </ButtonIcon>
                        </InputItemContainerValue>
                    </ContainerValue>
                    {

                        lerQrCode ?
                            <ContainerLeitorQrCode>
                                <LeitorQrCodeView>
                                    <QRCodeScanner
                                        containerStyle={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: '10%' }}
                                        cameraStyle={{ width: 220, height: 250 }}
                                        showMarker={true}
                                        markerStyle={{ width: 210, height: 220 }}
                                        onRead={onSuccess}
                                        flashMode={RNCamera.Constants.FlashMode.off}
                                    />
                                </LeitorQrCodeView>
                            </ContainerLeitorQrCode>
                            :
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
                    }

                    <ContainerButton>
                        <ButtonNext style={{ opacity: block ? 0.5 : 1 }} disabled={block} onPress={() => { avancarSenha() }}>
                            <TextButtonNext>Avançar</TextButtonNext>
                        </ButtonNext>
                    </ContainerButton>
                </Content>
            </ScrollView>
        </Container>

    );
};

//make this component available to the app
export default connect()(PagamentoCartaoScreen)

