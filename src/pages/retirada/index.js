import React, { useEffect, useState } from 'react';
import {
    ArrowBack,
    ButtonNext,
    Container,
    ContainerButton,
    ContainerInfo,
    Content,
    Header,
    TextButtonNext,
    TitlePage,
    TextItemContainerInfo,
    TextInfo,
    ContainerSlider,
    LinhaSlider,
    TextInfoSlider,
    ContainerRow,
    ContainerSelect,
    ItemContainerSelect,
    ItemContainerNotSelect,
    ContainerSliderValue,
    TextInfoSliderValue,
    TextItemInfoTaxa,
    ContainerInfoTaxa,
    ContainerValue,
    TextItemContainerValue,
    InputItemContainerValue,
    InputValue
} from './styles';
import { connect, useDispatch } from 'react-redux';
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { convertMoney, convertMoneyFloat } from '../../../util';

import Slider from '@react-native-community/slider';
import { GET, POST } from '../../service';
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appLoaded, logout } from '../../store/actions';
// create a component
const RetiradaScreen = ({ navigation, isFocused }) => {

    const [valor, setValor] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [ContasBancarias, setContasBancarias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [contaBancariaSelected, setContaBancariaSelected] = useState("");
    const [estabelecimento, setEstabelecimento] = useState({});
    const [taxaSaque, setTaxaSaque] = useState(0);
    const [Saldo, setSaldo] = useState(0);
    const [block, setBlock] = useState(true);

    const dispatch = useDispatch();


    function init() {
        getEstabelecimentoContasBancarias();
        getEstabelecimento();
        getTaxaSaque();
    }

    async function getTaxaSaque() {
        try {
            setLoading(true);
            var response = await GET(`TaxaSaque`);
            setLoading(false);
            if (response.status == 200) {
                setTaxaSaque(response.data.PorcentagemTaxa);
            } else {
                Alert.alert('Erro', 'Erro ao tentar obter porcentagem', [
                    {
                        text: 'OK',
                    },
                ]);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter porcentagem', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    async function getEstabelecimento() {
        try {
            setLoading(true);
            var response = await GET(`Estabelecimento`);
            setLoading(false);
            if (response.status == 200) {
                setEstabelecimento(response.data);
                var saldo = response.data.Saldo / 100;
                setSaldo(saldo)
            } else {
                Alert.alert('Erro', 'Erro ao tentar obter dados', [
                    {
                        text: 'OK',
                    },
                ]);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter dados', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    async function getEstabelecimentoContasBancarias() {
        try {

            var response = await GET(`Estabelecimento/ContasBancarias`);
            setLoading(false);
            if (response.status == 200) {
                setContasBancarias(response.data);
            } else {
                Alert.alert('Erro', 'Erro ao tentar obter contas bancárias', [
                    {
                        text: 'OK',
                    },
                ]);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter contas bancárias', [
                {
                    text: 'OK',
                },
            ]);
        }
    }


    async function handleRetirada() {
        try {

            if (!contaBancariaSelected) {
                return;
            }

            if (!sliderValue) {
                return;
            }

            if (loading) {
                return
            }

            setLoading(true);


            // let valorRetirada_ = sliderValue - calcularValorTaxa();
            let valorRetirada_ = sliderValue;

            let body = {
                "Valor": valorRetirada_ * 100,
                "ContaBancariaId": contaBancariaSelected,
                "Assinatura": md5('1q2w3e4r5t')
            }
            console.log(body)
            var response = await POST(`/Saque`, body).then(async (response) => {
                navigation.navigate('SucessoRetirada', { valorRetirada: valorRetirada_, contaBancariaSelected: contaBancariaSelected });
            }).catch((err) => {
                if (err.response) {
                }
                setLoading(false);
                if (err.response.status == 401) {
                    logOutSys();
                } else {
                    Alert.alert('Erro', err.response.data.message, [
                        {
                            text: 'OK',
                        },
                    ]);
                }
            });
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar realizar saque', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    function logOutSys() {
        const keys = ['@BRR:token', '@BRR:user']
        AsyncStorage.multiRemove(keys);
        dispatch(logout('LOGGOUT'));
        dispatch(appLoaded(true));
    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);


    function selectItem(item) {
        let obj = item.id;
        let newArr = [...ContasBancarias];
        var data_ = newArr.filter(x => x.id == obj);
        if (data_.length > 0) {
            data_[0].selected = true;
            setContaBancariaSelected(data_[0].Id)
            setContasBancarias(newArr);
        }
    }

    function calcularValorTaxa() {
        let valor = 0;
        valor = sliderValue * taxaSaque / 10000;
        return valor;
    }

    function calcValorSaque() {
        let valor = 0;
        valor = sliderValue - calcularValorTaxa();
        return convertMoney(valor);
    }

    useEffect(() => {
        if (sliderValue == 0 || contaBancariaSelected == null || contaBancariaSelected == "") {
            setBlock(true)
        } else {
            setBlock(false)
        }
        setValor(sliderValue);
    }, [sliderValue, contaBancariaSelected]);



    return (
        <Container>
            <ScrollView>
                <Header>
                    <TouchableOpacity onPress={() => { navigation.pop() }}>
                        <ArrowBack />
                    </TouchableOpacity>
                    <TitlePage>Retirar Dinheiro</TitlePage>
                </Header>

                <Content>
                    <FlatList
                        data={ContasBancarias}
                        renderItem={({ item }) => {
                            return (
                                <ContainerInfo>
                                    <ContainerSelect>
                                        {
                                            item.selected ?
                                                <ItemContainerSelect />
                                                :
                                                <ItemContainerNotSelect onPress={() => {
                                                    selectItem(item)
                                                }} />
                                        }
                                    </ContainerSelect>
                                    <ContainerRow>
                                        <TextItemContainerInfo>
                                            Banco {item.Banco.Nome}
                                        </TextItemContainerInfo>
                                        <TextInfo>
                                            Agência: {item.Agencia}
                                        </TextInfo>
                                        <TextInfo>
                                            Conta: {item.Conta}
                                        </TextInfo>
                                        <TextInfo>
                                            Favorecido: {item.Favorecido}
                                        </TextInfo>
                                        {/* <TextInfo>
                                            CNPJ: 00.000.000.0001/00
                                        </TextInfo> */}
                                    </ContainerRow>
                                </ContainerInfo>
                            );
                        }}
                        keyExtractor={item => Math.floor(Math.random() * 100000000).toString()}
                    />
                </Content>

                <Content>
                    <ContainerInfoTaxa>
                        <ContainerRow>
                            <TextItemInfoTaxa>
                                Valor selecioado {convertMoney(sliderValue)}
                            </TextItemInfoTaxa>
                            <TextItemInfoTaxa>
                                Valor da taxa: {convertMoney(calcularValorTaxa())}
                            </TextItemInfoTaxa>
                            <TextItemInfoTaxa>
                                Valor a ser sacado:{calcValorSaque()}
                            </TextItemInfoTaxa>
                        </ContainerRow>
                    </ContainerInfoTaxa>
                </Content>
                <ContainerSlider>
                    <LinhaSlider>
                        <TextInfoSlider>
                            Saldo Disponível
                        </TextInfoSlider>
                        <TextInfoSlider>
                            {convertMoney(Saldo)}
                        </TextInfoSlider>
                    </LinhaSlider>

                    <ContainerValue>
                        <TextItemContainerValue>Insira o Valor</TextItemContainerValue>
                        <InputItemContainerValue>
                            <InputValue
                                editable={true}
                                value={valor}
                                onChangeText={(text) => {
                                    setValor(text)
                                    setSliderValue(convertMoneyFloat(text));
                                }}
                            />
                        </InputItemContainerValue>
                    </ContainerValue>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={Saldo}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#999"
                        value={sliderValue}
                        step={0.1}
                        onValueChange={(value) => {
                            setSliderValue(value);
                        }}
                    />
                    <ContainerSliderValue>
                        <TextInfoSliderValue>{convertMoney(sliderValue)}</TextInfoSliderValue>
                    </ContainerSliderValue>
                </ContainerSlider>
                <ContainerButton >
                    <ButtonNext style={{ opacity: block ? 0.5 : 1 }} disabled={block} onPress={() => { handleRetirada() }}>
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <TextButtonNext>Solicitar</TextButtonNext>
                        )}
                    </ButtonNext>
                </ContainerButton>
            </ScrollView>
        </Container>

    );
};

//make this component available to the app
export default connect()(RetiradaScreen)

