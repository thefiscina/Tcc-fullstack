//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { ButtonIcon, ButtonNext, Container, ContenButtons, ContentHeader, ContentPainel, ContentSends, Header, Painel, RowContentPainel, RowContentPainelValue, RowContentSends, TextButtonHeader, TextH1, TextH1Painel, TextInfo, TextInfoPainel, TextSend, TextValue } from './styles';
import { connect } from 'react-redux';
import ShareIcon from '../../assets/icons/share.svg';
import SmartPhoneIcon from '../../assets/icons/smartphone.svg';
import MailIcon from '../../assets/icons/mail.svg';

import { convertMoney } from '../../../util';
import { Alert, ScrollView, View } from 'react-native';
import { GET } from '../../service';


import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';


// create a component
const SucessoRetiradaScreen = ({ navigation }) => {
    const [estabelecimento, setContaBancaria] = useState({});
    const [loading, setLoading] = useState(false);
    const [valorSolicitado, setValorSolicitado] = useState(0);
    const viewRef = useRef();


    async function init() {
        const { valorRetirada, contaBancariaSelected } = navigation.state.params;
        setValorSolicitado(valorRetirada);
        await getEstabelecimentoContasBancarias(contaBancariaSelected);
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


    async function getEstabelecimentoContasBancarias(contaBancariaSelected) {
        try {

            var response = await GET(`Estabelecimento/ContasBancarias`);
            setLoading(false);
            if (response.status == 200) {
                var estab = response.data.filter(x => x.Id == contaBancariaSelected);
                if (estab.length > 0) {
                    setContaBancaria(estab[0]);
                }
            } else {
                Alert.alert('Erro', 'Erro ao tentar obter contas bancárias', [
                    {
                        text: 'OK',
                    },
                ]);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar obter contas bancárias', [
                {
                    text: 'OK',
                },
            ]);
        }
    }



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
                                Operação solicitada com sucesso!
                            </TextInfo>
                        </ContentHeader>
                        <ButtonIcon>
                            {/* <ShareIcon width={20} height={20} /> */}
                        </ButtonIcon>
                    </Header>

                    <Painel>
                        <ContentPainel>
                            {
                                estabelecimento != null ?
                                    <RowContentPainel>
                                        <TextH1Painel>
                                            Banco {estabelecimento?.Banco != null ? estabelecimento?.Banco.Nome : ''}
                                        </TextH1Painel>
                                        <TextInfoPainel>
                                            Agência: {estabelecimento.Agencia}
                                        </TextInfoPainel>
                                        <TextInfoPainel>
                                            Conta: {estabelecimento.Conta}
                                        </TextInfoPainel>
                                        <TextInfoPainel>
                                            Nome e Sobrenome: {estabelecimento.Favorecido}
                                        </TextInfoPainel>
                                    </RowContentPainel>
                                    : null
                            }

                            <RowContentPainelValue>
                                <TextValue>
                                    {convertMoney(valorSolicitado)}
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
                    {/* <ButtonNext onPress={() => { navigation.navigate('Pagamento') }}>
                        <TextButtonHeader>Novo Pagamento</TextButtonHeader>
                    </ButtonNext> */}

                    <ButtonNext onPress={() => { navigation.navigate('Principal') }}>
                        <TextButtonHeader>Concluir</TextButtonHeader>
                    </ButtonNext>
                </ContenButtons>
            </ScrollView>
        </Container>
    );
};



//make this component available to the app
export default connect()(SucessoRetiradaScreen)

