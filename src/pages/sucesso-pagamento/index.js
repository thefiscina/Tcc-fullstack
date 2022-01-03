//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { ButtonIcon, ButtonNext, Container, ContenButtons, ContentHeader, ContentPainel, ContentSends, Header, Painel, RowContentPainel, RowContentPainelValue, RowContentSends, TextButtonHeader, TextH1, TextH1Painel, TextInfo, TextInfoPainel, TextSend, TextValue } from './styles';
import { connect } from 'react-redux';
import ShareIcon from '../../assets/icons/share.svg';
import SmartPhoneIcon from '../../assets/icons/smartphone.svg';
import MailIcon from '../../assets/icons/mail.svg';

import { convertMoney } from '../../../util';
import { ScrollView, View } from 'react-native';
import moment from 'moment';

import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { colors } from '../../styles';



// create a component
const SucessoScreen = ({ navigation, isFocused }) => {
    const [dados, setDados] = useState({});
    const viewRef = useRef();

    function init() {
        const { dado } = navigation.state.params;
        setDados(dado);
        console.log(dado)
    }

    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);


    const shareImage = async () => {
        try {
            // capture component 
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });

            // share
            const shareResponse = await Share.open({ url: uri });
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <Container>
            <ScrollView>
                <View style={{ backgroundColor: "#fff" }} ref={viewRef}>
                    <Header>
                        <ContentHeader>
                            <TextH1>
                                Sucesso!
                            </TextH1>
                            <TextInfo>
                                Operação finalizada com sucesso!
                            </TextInfo>
                        </ContentHeader>
                        {/* <ButtonIcon onPress={() => {
                            shareImage()
                        }}>
                            <ShareIcon width={20} height={20} />
                        </ButtonIcon> */}
                    </Header>

                    <Painel>
                        <ContentPainel>
                            <RowContentPainel>
                                <TextH1Painel>
                                    Dados do estabelecimento:
                                </TextH1Painel>
                                <TextInfoPainel>
                                    Nome:{dados?.NomeEstabelecimento}.
                                </TextInfoPainel>
                                <TextInfoPainel>
                                    Endereço: {dados?.EnderecoEstabelecimento}.
                                </TextInfoPainel>
                            </RowContentPainel>

                            <RowContentPainel>
                                <TextH1Painel>
                                    Dados da transação:
                                </TextH1Painel>
                                <TextInfoPainel>
                                    Nome: {dados?.NomeCliente}.
                                </TextInfoPainel>
                                <TextInfoPainel>
                                    Data e Hora: {moment(dados?.DataExecucao).format("DD/MM/YYYY HH:mm:ss")}
                                </TextInfoPainel>
                                <TextInfoPainel>
                                    ID da transação:{dados?.CodigoTransacaoEstabelecimento}
                                </TextInfoPainel>
                            </RowContentPainel>
                            <RowContentPainelValue>
                                <TextValue>
                                    {convertMoney(dados?.Valor / 100)}
                                </TextValue>
                            </RowContentPainelValue>
                        </ContentPainel>
                    </Painel>
                </View>
                {/* <ContentSends>
                    <RowContentSends>
                        <SmartPhoneIcon width={20} height={20} />
                        <TextSend>
                            Enviar comprovante por SMS
                        </TextSend>
                    </RowContentSends>
                    <RowContentSends>
                        <MailIcon width={20} height={20} />
                        <TextSend>
                            Enviar comprovante por e-mail
                        </TextSend>
                    </RowContentSends>
                </ContentSends> */}

                <ContenButtons>
                    <ButtonNext onPress={() => { navigation.navigate('Pagamento', { novo: true }) }}>
                        <TextButtonHeader>Novo Pagamento</TextButtonHeader>
                    </ButtonNext>

                    <ButtonNext onPress={() => { navigation.navigate('Principal') }}>
                        <TextButtonHeader>Concluir</TextButtonHeader>
                    </ButtonNext>
                </ContenButtons>
            </ScrollView>
        </Container>
    );
};



//make this component available to the app
export default connect()(SucessoScreen)

