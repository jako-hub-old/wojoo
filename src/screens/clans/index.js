import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { ClansManager } from '../../components';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ClansScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen 
                navigation={navigation} title={_t('my_profile_title_1')} 
                allowUserStatus
            >
                <ClansManager navigation = { navigation } />
            </BaseScreen>
        );
    }
}

ClansScreen.propTypes = {
    navigation : PropTypes.object,
};

export default ClansScreen;