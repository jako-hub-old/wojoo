import React from 'react';
import { connect } from 'react-redux';
import { addNotify, removeNotify, popNotify, viewNotify, fetchNews} from '../store/actions/global.actions';
import { fetchFriendshipRequest, fetchMyFriends, fetchUserSendedRequests, fetchClanInvitations, } from '../store/actions/userData.actions';
import { fetchGameInvitations }  from '../store/actions/game.actions';
import { selectGame } from '../store/actions/search.actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import uuid from 'react-native-uuid';

export const TYPE_NEW_GAME              = 'new-game';
export const TYPE_FRIENDSHIP_REQUEST    = 'friend-request';
export const TYPE_PULL_ACTIVITIES       = 'pull-news';
export const TYPE_GAME_INVITATION       = 'game-invitation';
export const TYPE_CLAN_INVITATION       = 'clan-invitation';

const mapDispatchToProps = dispatch => bindActionCreators({
    addNotify,
    removeNotify,
    popNotify,
    viewNotify,
    selectGame,
    fetchFriendshipRequest,
    fetchUserSendedRequests,
    fetchGameInvitations,
    fetchMyFriends,
    fetchNews,
    fetchClanInvitations,
}, dispatch);

const mapStateToProps = ({global:{notifications=[]}, session:{userCode}}) => ({
    notifications,
});

export const propTypes = {
    notify          : PropTypes.func,
    removeNotify    : PropTypes.func,
    popNotify       : PropTypes.func,
    notifies        : PropTypes.arrayOf(PropTypes.shape({
        id          : PropTypes.any,
        title       : PropTypes.string,
        body        : PropTypes.string,
    })),
    viewNotify      : PropTypes.func,
    selectGame      : PropTypes.func,
};

export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {
        addNotify(notify) {
            notify.id = uuid.v1();
            this.props.addNotify(notify);
            if(notify.type === TYPE_FRIENDSHIP_REQUEST) {
                this.props.fetchFriendshipRequest();
                this.props.fetchMyFriends(this.props.userCode);
                this.props.fetchUserSendedRequests();
            }
            if(notify.type === TYPE_NEW_GAME || notify.type === TYPE_PULL_ACTIVITIES) {
                this.props.fetchNews();
            }
            if(notify.type === TYPE_GAME_INVITATION) {
                this.props.fetchGameInvitations();
            }
            if(notify.type === TYPE_CLAN_INVITATION) {
                this.props.fetchClanInvitations();
            }
        }
        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    notify = { notify => this.addNotify(notify) }
                />
            )
        }
    }
));