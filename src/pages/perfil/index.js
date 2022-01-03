//import liraries
import React, { useEffect } from 'react';
import {
    ArrowFront,
    Container,
    ContainerClose,
    ContainerList,
    Content,
    ContentHeader,
    Header,
    IconContainer,
    Item,
    ItemHeader,
    ItemList,
    PerfilImage,
    ProfileContainer,
    TextItem,
    TextLink,
    TextName,
    TextTitle
} from './styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import Inicio from '../../assets/icons/inicio.svg';
import Pagamento from '../../assets/icons/pagamento.svg';
import Retirada from '../../assets/icons/retirada.svg';
import Ajuda from '../../assets/icons/suport.svg';
import Sair from '../../assets/icons/sair.svg';
import Close from '../../assets/icons/close.svg';

import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appLoaded, logout } from '../../store/actions';


// create a component
const PerfilScreen = ({ navigation, isFocused }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authState.user);
    function init() {
        console.log(user)
    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);

    function logOutSys() {
        const keys = ['@BPF:token', '@BPF:user']
        AsyncStorage.multiRemove(keys);
        dispatch(logout('LOGGOUT'));
        dispatch(appLoaded(true));
    }

    return (
        <Container>
            <Header>
                <ContentHeader>
                    <ItemHeader>
                        <ProfileContainer>
                            <PerfilImage
                                source={{
                                    uri: 'https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png',
                                }} />
                        </ProfileContainer>
                    </ItemHeader>
                    <ItemHeader>
                        <TextName>{user.Nome}</TextName>
                        <TextLink>Meu perfil</TextLink>
                    </ItemHeader>
                </ContentHeader>
            </Header>
            <Content>
                <View>
                    <TextTitle>Principal</TextTitle>
                </View>

                <ContainerList>
                    <ItemList onPress={() => { navigation.pop() }}>
                        <Item>
                            <IconContainer>
                                <Inicio />
                            </IconContainer>
                            <TextItem>Início</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList onPress={() => { navigation.navigate('Pagamento') }}>
                        <Item>
                            <IconContainer>
                                <Pagamento />
                            </IconContainer>
                            <TextItem>Novo Pagamento</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList onPress={() => { navigation.navigate('Retirada') }}>
                        <Item>
                            <IconContainer>
                                <Retirada />
                            </IconContainer>
                            <TextItem>Retirada</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList onPress={() => { navigation.navigate('Help') }}>
                        <Item>
                            <IconContainer>
                                <Ajuda />
                            </IconContainer>
                            <TextItem>Ajuda</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList onPress={() => {
                        logOutSys();
                    }}>
                        <Item>
                            <IconContainer>
                                <Sair />
                            </IconContainer>
                            <TextItem>Sair</TextItem>
                        </Item>
                    </ItemList>
                </ContainerList>

            </Content>
            <ContainerClose onPress={() => { navigation.pop() }}>
                <Close />
            </ContainerClose>
        </Container>

    );
};



//make this component available to the app
export default connect()(PerfilScreen)

