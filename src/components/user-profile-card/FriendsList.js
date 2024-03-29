import React from 'react';
import PropTypes from 'prop-types';
import {
    Body,
    Left,
    View,
    Text,
    List,
    ListItem,
    Thumbnail,    
} from 'native-base';
import { 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { DEFAULT_USER_IMG, IMAGES_SERVER }   from 'react-native-dotenv';
import { LoadingSpinner } from '../../commons/loaders';
import FriendshipSuggestion from '../my-profile/friendship-suggestion';
import { SimpleHeader } from '../../commons/containers';
import { PrettyButton } from '../../commons/forms';

class FriendsList extends React.PureComponent {
    componentDidMount() {
        if(this.props.fetchFriends) {
            this.props.fetchFriends();
        }
    }

    renderLoader() {
        return (
            <View style = { styles.root }>
                <View styles = { styles.loader }>
                    <LoadingSpinner />
                </View>
            </View>
        );
    }

    renderEmpty() {
        const navigation = this.props.navigation;
        return (            
            <>
                <View style = { styles.root }>
                    <Text note style = { { textAlign : "center", marginTop: 15 } }>
                        {"Aún no tiene contactos"}                
                    </Text>
                </View>
                <FriendshipSuggestion small navigation = { navigation } onlyIfResults />
            </>
        );
    }
    
    render() {
        const { 
            loading,
            friends = [],
            onViewProfile,
            max=3,
            hideMax,
            onViewAll
        } = this.props;
        if(loading) return this.renderLoader();
        if(friends.length === 0) return this.renderEmpty();
        let friendsList = [...friends], others=0;
        if(hideMax && friendsList.length > max) {
            others = friendsList.slice(max).length;
            friendsList = friendsList.slice(0, max);
        }
        const totalFriends = friends.length;
        return (
            <View style = { styles.root }>                
                <SimpleHeader title = {totalFriends > 0? `Mis amigos (${totalFriends})` : 'Mis amigos' } />
                <View style = { styles.friendsList }>
                    {friendsList.map((friend, key) => (
                        <View 
                            key = {`friend-list-item-${friend.codigo_jugador_amigo_pk}`}
                            style = { styles.firendItem }
                        >
                            <View style = { styles.friendAvatarWrapper }>
                                <Thumbnail style = { styles.friendAvatar } source = { {uri : friend.foto? `${IMAGES_SERVER}${friend.foto}` : DEFAULT_USER_IMG} }/>
                            </View>
                            <View style = { styles.friendInfo }>
                                <TouchableOpacity onPress = { () => onViewProfile(friend)}>
                                    <Text>{friend.jugador_amigo_rel_nombre_corto}</Text>
                                </TouchableOpacity>
                                <Text note>({friend.seudonimo})</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {hideMax && (
                    <View style = { styles.toggleMore }>
                        <PrettyButton small onPress = { onViewAll } >
                            Ver todos
                        </PrettyButton>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingBottom : 20,
    },
    toggleMore : {
        flexDirection : "row",
        justifyContent : "center",
        marginVertical : 15,
    },
    friendsList : {

    },
    firendItem : {
        flexDirection : "row",
        paddingVertical : 3,
    },
    friendInfo : {
        flex : 10,
    },
    friendAvatarWrapper : {
        flex : 2,
        justifyContent : "center",
    },
    friendAvatar : {
        backgroundColor : "#f0f0f0",
        alignSelf : "center",
        borderRadius : 100,
        width : 35,
        height : 35,
    },    
    loader : {
        flex : 1, 
        justifyContent : "center",
        alignItems : "center",
    },
    header : {
        backgroundColor : "#f7f7f7",
        padding         : 15,
    },
    headerText : {
        textAlign : "center",
        color : "#707070",
    },
});

FriendsList.propTypes = {
    loading         : PropTypes.bool,
    fetchFriends    : PropTypes.func,
    friends         : PropTypes.arrayOf(PropTypes.shape({
        jugador_amigo_rel_nombre_corto  : PropTypes.string,
        codigo_jugador_amigo            : PropTypes.any,
        codigo_jugador_amigo_pk         : PropTypes.any,
    })),
    onViewProfile : PropTypes.func,
    navigation : PropTypes.any,
    hideMax : PropTypes.bool,
    onViewAll : PropTypes.func,
};

export default FriendsList;