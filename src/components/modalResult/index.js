//import liraries
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Picker } from 'react-native';
import { ButtonClose, Container, Content, Header, HeaderText, ContainerSelect, ContenButtons, ButtonNext, TextButtonHeader } from './styles';
import Close from '../../assets/icons/close.svg';
import moment from 'moment';


// create a component
const ModalDataScreen = ({ navigation, visible, callback }) => {
    const [modalData, setModalData] = useState(false);
    const [meses, setMeses] = useState([]);
    const [anos, setAnos] = useState([]);

    const [mesSelecionado, setMesSelecionado] = useState(0);
    const [anoSelecionado, setAnoSelecionado] = useState(0);
    const [mesValue, setMesValue] = useState(0);



    function getYears() {
        var back = new Date().getFullYear() - new Date('2021-01-01').getFullYear();
        const year = new Date().getFullYear();
        return Array.from({ length: back }, (v, i) => year - back + i + 1);
    }

    async function init() {
        var meses_ = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
        var anos_ = getYears();

        await setMeses(meses_);
        await setAnos(anos_);
        console.log(anos_[anos_.length - 1]);
        setAnoSelecionado(anos_[anos_.length - 1]);
        console.log(meses_[new Date().getMonth()])
        setMesSelecionado(meses_[new Date().getMonth()]);
        setMesValue(new Date().getMonth() + 1);
    }

    useEffect(() => {
        init();
        setModalData(true);
    }, [visible]);


    function setMesAno() {
        var mes = "";
        if (mesValue.toString().length == 1) {
            mes = `0${mesValue}`;
        } else {
            mes = mesValue;
        }
        var mesAno = `${anoSelecionado}-${mes}-01`;
        console.log(mesAno)
        callback(mesAno)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalData}
            onRequestClose={() => {
                callback(null)
            }}
        >
            <Container>
                <Content>
                    <ButtonClose onPress={() => callback(null)}>
                        <Close />
                    </ButtonClose>
                    <Header>
                        <HeaderText>
                            Selecione o mês e o ano
                        </HeaderText>
                    </Header>

                    <HeaderText>
                        Mês / Ano
                    </HeaderText>

                    <ContainerSelect>
                        <Picker
                            selectedValue={mesSelecionado}
                            mode="dropdown"
                            style={{ height: 50, width: '90%', textAlign: 'center', marginHorizontal: 10 }}
                            onValueChange={(itemValue, itemIndex) => {
                                var mesValue = itemIndex + 1;
                                console.log(mesValue)
                                setMesValue(mesValue)
                                setMesSelecionado(itemValue)
                            }}
                        >
                            {
                                meses.map(item => {
                                    return <Picker.Item label={item} value={item} />
                                })
                            }
                        </Picker>
                    </ContainerSelect>

                    <ContainerSelect>
                        <Picker
                            mode="dropdown"
                            selectedValue={anoSelecionado}
                            style={{ height: 50, width: '90%', textAlign: 'center', marginHorizontal: 10 }}
                            onValueChange={(itemValue, itemIndex) => setAnoSelecionado(itemValue)}
                        >
                            {
                                anos.map(item => {
                                    return <Picker.Item label={item.toString()} value={item} />
                                })
                            }
                        </Picker>
                    </ContainerSelect>

                    <ContenButtons>
                        <ButtonNext onPress={() => setMesAno()}>
                            <TextButtonHeader>Selecionar</TextButtonHeader>
                        </ButtonNext>
                    </ContenButtons>
                </Content>
            </Container>
        </Modal>
    )
};



//make this component available to the app
export default ModalDataScreen

