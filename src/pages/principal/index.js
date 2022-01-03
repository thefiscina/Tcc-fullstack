//import liraries
import React, { useEffect, useState } from 'react';
import {
    Container,
    ContainerHeader,
    Content,
    Header,
    ItemHeader,
    TextHeader,
    TextValue,
    ItemValueHeader,
    ContainerIcon,
    ContainerButtonsHeader,
    ButtonHeader,
    TextButtonHeader,
    ContainerView,
    ContainerTabs,
    TabsSelect,
    Tabs,
    TextTab,
    TitleContainer,
    ContainerList,
    RowList,
    ItemRow,
    IconRow,
    InfoRow,
    NameTextRow,
    DateTextRow,
    ValueRow,
    ValueTextRow,
    BorderSelected
} from './styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import ViewIcon from '../../assets/icons/view.svg';
import UserIcon from '../../assets/icons/user2.svg';
import SaqueIcon from '../../assets/icons/user.svg';
import EntradaIcon from '../../assets/icons/user2.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import { ActivityIndicator, Alert, FlatList, LogBox, RefreshControl } from 'react-native';
import { convertMoney } from '../../../util';
import { colors } from '../../styles';
import { appLoaded, authenticaded, logout, setEstabelecimento } from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET } from '../../service';
import moment from 'moment';
import ModalDataScreen from '../../components/modalResult';

// create a component
const HomeScreen = ({ navigation, isFocused }) => {

    const [arrayTransacoes, setArrayTransacoes] = useState([]);
    const [tabSelected, setTabSelected] = useState(1);
    const [seeMoney, setSeeMoney] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingValue, setLoadingValue] = useState(false);

    const [estabelecimento, setEstabelecimento] = useState({});
    const [modalData, setModalData] = useState(false);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    function init() {
        getEstabelecimento();
        getLasWeek();
    }

    function getLasWeek() {
        const startOfMonth = moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DDTHH:mm:ss');
        const endOfMonth = moment().format('YYYY-MM-DDTHH:mm:ss');
        getTransacao(startOfMonth, endOfMonth)
    }

    function getLastMonth() {
        const startOfMonth = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DDTHH:mm:ss');
        const endOfMonth = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DDTHH:mm:ss');
        getTransacao(startOfMonth, endOfMonth)
    }

    function getByDate(date_ini) {
        const startOfMonth = moment(date_ini).startOf('month').format('YYYY-MM-DDTHH:mm:ss');
        const endOfMonth = moment(date_ini).endOf('month').format('YYYY-MM-DDTHH:mm:ss');
        getTransacao(startOfMonth, endOfMonth)
    }

    async function getEstabelecimento() {
        try {

            setLoadingValue(true)
            var response = await GET(`Estabelecimento`).then(async (response) => {
                setLoadingValue(false);
                await AsyncStorage.setItem('@BPF:estabelecimento', JSON.stringify(response.data));
                setEstabelecimento(response.data);
            }).catch((err) => {
                setLoadingValue(false);
                if (err.response) {
                    console.log(err.response.data); // => the response payload 
                }
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
            console.log(error)
            setLoadingValue(false);
            Alert.alert('Erro', 'Erro ao tentar obter dados', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    async function getTransacao(data_ini, data_fim) {
        try {
            setLoading(true);
            var response = await GET(`Estabelecimento/Operacoes?dataIni=${data_ini}&dataFim=${data_fim}`).then(async (response) => {
                setLoading(false);
                setArrayTransacoes(response.data);
                setIsRefreshing(false);

            }).catch((err) => {
                setIsRefreshing(false);
                setLoading(false);
                if (err.response) {
                    console.log(err.response.data); // => the response payload 
                }

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
            console.log(error)
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter dados', [
                {
                    text: 'OK',
                },
            ]);
        }
    }

    function logOutSys() {
        const keys = ['@BPF:token', '@BPF:user']
        AsyncStorage.multiRemove(keys);
        dispatch(logout('LOGGOUT'));
        dispatch(appLoaded(true));
    }


    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);




    function onRefresh() {
        setIsRefreshing(true);
        init();

    }

    return (
        <Container>
            <Header>
                <ContainerHeader>
                    <ItemHeader>
                        <TextHeader>
                            Total
                        </TextHeader>
                        <ItemValueHeader>
                            <TextValue>
                                {
                                    loadingValue ?
                                        <ActivityIndicator color="#c2c2c2" size="small" />
                                        :
                                        seeMoney ?
                                            convertMoney(estabelecimento.Saldo / 100) :
                                            'R$ ----,--'
                                }
                            </TextValue>
                            <ContainerIcon onPress={() => {
                                setSeeMoney(!seeMoney)
                            }}>
                                <ViewIcon width={25} height={25} />
                            </ContainerIcon>
                        </ItemValueHeader>
                    </ItemHeader>
                    <ItemHeader>
                        <ContainerIcon onPress={() => {
                            navigation.navigate('Perfil');
                        }}>
                            <UserIcon width={25} height={25} />
                        </ContainerIcon>
                    </ItemHeader>
                </ContainerHeader>
                <ContainerButtonsHeader>
                    <ButtonHeader onPress={() => {
                        navigation.navigate('Retirada');
                    }}>
                        <TextButtonHeader>
                            Saque
                        </TextButtonHeader>
                    </ButtonHeader>

                    <ButtonHeader onPress={() => {
                        navigation.navigate('Pagamento');
                    }}>
                        <TextButtonHeader>
                            Novo Pagamento
                        </TextButtonHeader>
                    </ButtonHeader>
                </ContainerButtonsHeader>
            </Header>
            <Content>
                <ContainerTabs>
                    <TabsSelect>
                        <Tabs onPress={() => {
                            setTabSelected(1);
                            getLasWeek();
                        }}>
                            <TextTab style={{ color: tabSelected == 1 ? colors.botao_acao : '#999', marginBottom: tabSelected == 1 ? 0 : 10 }}>Última Semana</TextTab>
                            {
                                tabSelected == 1 ?
                                    <BorderSelected />
                                    : null
                            }
                        </Tabs>
                        <Tabs onPress={() => {
                            setTabSelected(2);
                            getLastMonth();
                        }}>
                            <TextTab style={{ color: tabSelected == 2 ? colors.botao_acao : '#999', marginBottom: tabSelected == 2 ? 0 : 10 }}>Mês Passado</TextTab>
                            {
                                tabSelected == 2 ?
                                    <BorderSelected />
                                    : null
                            }
                        </Tabs>
                    </TabsSelect>
                    <ContainerIcon onPress={() => {
                        setModalData(true);
                    }}>
                        <CalendarIcon width={25} height={25} />
                    </ContainerIcon>
                </ContainerTabs>
                <ContainerView>
                    <TitleContainer>
                        Transações
                    </TitleContainer>
                    <ContainerList>
                        {
                            loading ?
                                <ActivityIndicator color="#c2c2c2" size="small" />
                                :

                                arrayTransacoes.length > 0 ?
                                    <FlatList
                                        data={arrayTransacoes}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isRefreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        renderItem={({ item }) => {
                                            return (
                                                <RowList key={Math.floor(Math.random() * 100000000).toString()}>
                                                    <ItemRow>
                                                        <IconRow>
                                                            {
                                                                item.TipoOperacao == 'Saque' || item.TipoOperacao == 'Taxa de Saque' ?
                                                                    <SaqueIcon width={35} height={35} /> :
                                                                    <EntradaIcon width={35} height={35} />

                                                            }
                                                        </IconRow>
                                                        <InfoRow>
                                                            <NameTextRow>
                                                                {
                                                                    item.TipoOperacao == 'Taxa de Saque' ?
                                                                        item.TipoOperacao :
                                                                        item.Nome
                                                                }
                                                            </NameTextRow>
                                                            <DateTextRow>{moment(item.DataHora).format("DD/MM/YYYY HH:mm:ss")}</DateTextRow>
                                                        </InfoRow>
                                                    </ItemRow>
                                                    <ItemRow>
                                                        <ValueRow>
                                                            <ValueTextRow
                                                                style={{ color: item.Valor.toString().includes("-") ? 'red' : '#25968d' }}
                                                            >{convertMoney(item.Valor / 100)}</ValueTextRow>
                                                        </ValueRow>
                                                    </ItemRow>
                                                </RowList>
                                            );
                                        }}
                                        keyExtractor={item => Math.floor(Math.random() * 100000000).toString()}
                                    /> :
                                    <InfoRow>
                                        <NameTextRow style={{ textAlign: 'center' }}>Nenhum registro encontrado</NameTextRow>
                                    </InfoRow>
                        }

                    </ContainerList>
                </ContainerView>
                {
                    modalData ?
                        <ModalDataScreen
                            visible={modalData}
                            callback={(value) => {
                                console.log(value);
                                if (value != null && !value._dispatchInstances) {
                                    getByDate(value);
                                }
                                setModalData(false);
                            }} />
                        : null
                }
            </Content>
        </Container>
    );
};



//make this component available to the app
export default connect()(HomeScreen)

