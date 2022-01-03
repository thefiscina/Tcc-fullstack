//import liraries
import React, { useEffect } from 'react';
import {
    ArrowBack,
    Container,
    ContainerList,
    Content,
    Header,
    Item,
    ItemList,
    Logo,
    TextHelp,
    TextItem,
    ArrowFront,
    IconContainer
} from './styles';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Seguranca from '../../assets/icons/seguranca.svg';
import Notificacoes from '../../assets/icons/notificacao.svg';
import Suporte from '../../assets/icons/suport.svg';
import Informacoes from '../../assets/icons/informacao.svg';


// create a component
const HelpScreen = ({ navigation, isFocused }) => {

    function init() {

    }
    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);



    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <ArrowBack />
                </TouchableOpacity>
                <Logo />
            </Header>
            <Content>
                <View>
                    <TextHelp>Precisa de ajuda?</TextHelp>
                </View>
                <ContainerList>
                    <ItemList>
                        <Item>
                            <IconContainer>
                                <Seguranca />
                            </IconContainer>
                            <TextItem>Segurança</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList>
                        <Item>
                            <IconContainer>
                                <Notificacoes />
                            </IconContainer>
                            <TextItem>Notificações</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList>
                        <Item>
                            <IconContainer>
                                <Suporte />
                            </IconContainer>
                            <TextItem>Suporte</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>

                    <ItemList>
                        <Item>
                            <IconContainer>
                                <Informacoes />
                            </IconContainer>
                            <TextItem>Informações</TextItem>
                        </Item>
                        <ArrowFront />
                    </ItemList>
                </ContainerList>
            </Content>
        </Container>

    );
};



//make this component available to the app
export default connect()(HelpScreen)

