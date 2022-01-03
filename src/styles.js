import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
export const colors = {
    background_principal: '#e3eeeb',
    botao_acao: "#07877d",
    texto_ativo: '#25968d',
    texto_inativo: '#818485',
    valor_monetario: '#202426',
};

export default StyleSheet.create({
    splashContainer: { flex: 1, backgroundColor: colors.background_principal, justifyContent: 'center', alignContent: 'center', alignItems: 'center' },
    imageSplash: { width: 215, height: 28 },
    imageIconTab: { width: 30, height: 30 },
    imageIconButton: { width: 40, height: 40 },
    textInput: {
        height: 40,
        width: '50%',
        borderBottomColor: '#f4f5f7',
        borderBottomWidth: 1
    },
    subtitle: {
        // marginTop: 6,
        color: 'white',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Roboto'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    styleButtonLock: { marginHorizontal: 5, backgroundColor: '#828181', borderRadius: 50, width: 30, height: 30, zIndex: 10, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' },
    buttonBlock: {
        position: 'relative', bottom: 0, right: -150, top: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    buttonAdd: { padding: 10, borderColor: '#707070', borderRadius: 10, borderWidth: 1 },
    textInptMaskStyle: { height: 48, fontSize: 17, color: "#000", flex: 1 }
})