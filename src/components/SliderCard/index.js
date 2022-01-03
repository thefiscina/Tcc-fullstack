//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import styles, { colors } from './index.style';
import Pagination from './Pagination';
import SliderEntry from './SliderEntry';
import { itemWidth, sliderWidth } from './styles';
// create a component
const SliderCard = ({ cards_, callback }) => {
    const token = useSelector(state => state.authState.token);
    const IS_ANDROID = Platform.OS === 'android';
    const SLIDER_1_FIRST_ITEM = 0;

    const [slideActive, setSlideActive] = useState(0);
    const [cards, setCards] = useState([]);

    var _slider1Ref = useRef();

    useEffect(() => {
        setCards(cards_)
    }, []);

    function _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
                token={token}
                index={index}
                activeIndex={slideActive}
            />
        );
    }

    return (
        <View style={styles.exampleContainer}>
            <Carousel
                ref={c => _slider1Ref = c}
                data={cards}
                renderItem={_renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={false}
                loopClonesPerSide={1}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => {
                    setSlideActive(index)
                    callback(index)
                }}
            />
            <Pagination
                dotsLength={cards.length}
                activeDotIndex={slideActive}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={colors.black}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={_slider1Ref}
                tappableDots={!!_slider1Ref}
            />
        </View>
    );
};

export default SliderCard;
