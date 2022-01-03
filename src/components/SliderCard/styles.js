import { borderRadius } from 'polished';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = 250 + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: 250,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
        position: 'relative'
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        height: 150,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius,
        borderRadius: entryBorderRadius,
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        // resizeMode: 'cover',
        // borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        // backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black,
        height: entryBorderRadius,
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        // borderBottomLeftRadius: entryBorderRadius,
        // borderBottomRightRadius: entryBorderRadius
        height: entryBorderRadius,
        fontFamily: 'Roboto'

    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    titleEven: {
        color: 'white'
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
        position: 'relative', bottom: 0, right: -150, top: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonAdd: { padding: 10, borderColor: '#707070', borderRadius: 10, borderWidth: 1 }
});