import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import {IMAGES_SERVER} from 'react-native-dotenv';
import defaultImage from '../../assets/images/default-clan-image.png';
import { PhotoDisplay } from '../../commons/containers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RatingStarDisplay from '../../commons/rating-start-display';
import { SimpleTouch } from '../../commons/touchables';
import stylesPalette from '../../utils/stylesPalette';

const ResultItem = ({name, gameType, onPress, isInClan, icon, photo, rating=0, id, city, members=0}) => {
    const srcPhoto = photo? {uri : `${IMAGES_SERVER}${photo}`} : defaultImage;
    return (
        <SimpleTouch onPress = { onPress } wrapType = "stretch">
            <View style = { styles.root }>
                <View style = { styles.imageWrapper }>
                    <PhotoDisplay 
                        avatar
                        opacity     = { !photo      }
                        imageSource = { srcPhoto    }
                    />
                    {isInClan && (
                    <View style = { styles.isInGame }>
                        <Text style={ styles.isInGameText }>Miembro</Text>
                    </View>
                    )}
                </View>
                <View style = { styles.contentWrapper }>
                    <Text>{`${name} (${city})`}</Text>
                    <View style = { styles.textLine }>
                        {icon && (<Icon style = { styles.textIcon } name = { icon } size = { 18 } />)}
                        <Text note>{gameType}</Text>
                    </View>
                    <RatingStarDisplay 
                        value = { rating }
                        id    = { id }
                    />
                </View>
                <View style = { styles.cornerContainer }>
                    <View style = { styles.membersWrapper }>
                        <Icon style ={ {marginRight : 4,} } name = "users" size = { 15 } />
                        <Text>{members}</Text>
                    </View>
                </View>
            </View>
        </SimpleTouch>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flexDirection       : "row",
        padding             : 5,
        paddingHorizontal   : 15,
    },
    imageWrapper : {
        flex : 2,
        alignItems : "center",
    },
    contentWrapper : {
        paddingLeft : 15,
        flex : 8,
    },
    textLine : {
        flexDirection : "row",
        alignItems : "center",
    },
    textIcon : {
        marginRight : 5,
    },
    cornerContainer : {
        flex: 1,
        justifyContent : "flex-end",
    },
    membersWrapper : {
        flexDirection : "row",
    },
    isInGame : {
        backgroundColor     : palette.primary.color,
        paddingHorizontal   : 10,
        marginTop           : 5,
        borderRadius        : 10,
    },
    isInGameText : {color : "#FFF", fontSize : 8},
});

export default ResultItem;