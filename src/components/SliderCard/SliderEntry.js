import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles';
import iconCartao from '../../assets/cartaoAlimentacao.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { bloquearcartao, consultarSaldo, desbloquearcartao } from '../../Services/redes';
import { convertMoeda } from '../../Services/url';
import { colors } from './index.style';


export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object,
        token: PropTypes.token,
        index: PropTypes.index,
        activeIndex: PropTypes.active
    };

    get image() {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={iconCartao}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={{ ...styles.image, resizeMode: 'contain' }}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={iconCartao}
                style={{ ...styles.image, resizeMode: 'contain' }}
            />
        );
    }

    blockCard = async (cdCartao, status) => {
        const { token } = this.props;
        var body = {
            token: token, //obrigatório
            cdCartao: cdCartao, //obrigatório                
        }
        console.log(body)
        try {
            var response = await bloquearcartao(body).then((res) => {
                console.log(res);
                status = "BLOQUEADO";
            }).catch((res) => {
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }

    desbloquearCard = async (cdCartao, status) => {
        const { token } = this.props;
        var body = {
            token: token, //obrigatório
            cdCartao: cdCartao, //obrigatório                
        }
        console.log(body)
        try {
            var response = await desbloquearcartao(body).then((res) => {
                console.log(res);
                status = "ATIVO";
            }).catch((res) => {
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }

    addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    render() {
        var { data: { externoMsk, title, status, cdCartao }, index, activeIndex, even } = this.props;
        console.log(title)
        const uppercaseCode = externoMsk ? (
            <Text
                style={[styles.title]}
            >
                {externoMsk.toUpperCase()}
            </Text>
        ) : false;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title]}
            >
                {title}
            </Text>
        ) : false;

        return (
            <View
                style={styles.slideInnerContainer}
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    {this.image}
                    <View style={[styles.radiusMask]} />
                    <View style={{ position: 'absolute', top: 10, left: 10 }}>
                        {uppercaseTitle}
                    </View>

                    <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                        {uppercaseCode}
                    </View>

                </View>
                {/* {
                    index == activeIndex ?
                        <>
                            <View style={styles.buttonBlock}>
                                <Text style={styles.subtitle}>
                                    {status == "ATIVO" ? "desbloqueado" : "bloqueado"}
                                </Text>
                                <TouchableOpacity
                                    style={styles.styleButtonLock}
                                    onPress={() => {
                                        if (status == "ATIVO") {
                                            console.log('DESATIVAR')
                                            status = "DESATIVADO";
                                            //this.blockCard(cdCartao, status);
                                        } else {
                                            console.log('ATIVAR')
                                            status = "ATIVO";
                                            // this.desbloquearCard(cdCartao, status);
                                        }
                                    }}>

                                    <IconMaterial name={status == "ATIVO" ? "lock-open" : "lock"} size={23} color={'#fff'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ position: 'relative', bottom: 15, left: 10 }}>
                                <Text style={styles.subtitle}>Consumo médio: {convertMoeda("0")}</Text>
                            </View>
                            <View style={{ position: 'relative', bottom: 13, left: 10 }}>
                                <Text style={styles.subtitle}>Próxima Regarga: {'22/09/2021'}</Text>
                            </View>
                            <View style={{ position: 'relative', bottom: 12, left: 10 }}>
                                <Text style={styles.subtitle}>Valor Próxima Recarga: {convertMoeda("0")}</Text>
                            </View>
                        </>

                        : null
                } */}

            </View>
        );
    }
}