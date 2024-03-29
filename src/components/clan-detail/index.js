import React from 'react';
import PropTypes from 'prop-types';
import ClanDetailWrapper from './ClanDetailWrapper';
import ClanDetailView from './ClanDetailView';
import { withApi, withUserData } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import ClanMemberslist from './ClanMembersList';
import ClanActions from './ClanActions';
import ClanRequests from './ClanRequests';

/**
 * This component renders a clan detail.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ClanDetail extends React.PureComponent {
    state = {
        loading : true,
        clanInfo : {
            nombre      : null,
            rating      : 1,
            juego_tipo  : "",
            miembros    : [],
        },        
    };

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const {doPost, clanCode,} = this.props;
        let clanInfo = null;
        this.setState({loading : true});
        try {
            const response = await doPost(endpoints.clan.detalle, {
                clan : clanCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al obtener la información del clan");
                consoleError("Clan detail", response);
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                clanInfo = response;
            }
        } catch (response) {
            addMessage("Ocurrió un error al obtener la información del clan");
            consoleError("Clan detail", response);
        } finally {
            this.setState((state) => ({
                loading : false,
                clanInfo : clanInfo? clanInfo : state.clanInfo,
            }));
        }        
    }

    async refreshInfo() {
        await this.fetchData();
    }

    isAdmin() {
        const {clanCode, adminClans=[]} = this.props;
        const selected = adminClans.find(item => item.codigo_clan === clanCode);
        return Boolean(selected);
    }

    onApprove() {
        this.refreshInfo();
    }

    render() {
        const {
            loading,
            clanInfo,
        } = this.state;
        const {clanCode} = this.props;
        const isAdmin = this.isAdmin();
        return (
            <ClanDetailWrapper onRefresh = { () => this.refreshInfo() } loading = { loading } >
                <ClanDetailView
                    name        = { clanInfo.nombre         }
                    rating      = { clanInfo.rating         }
                    typeName    = { clanInfo.juego_tipo     }
                    members     = { clanInfo.miembros       }
                    photo       = { clanInfo.foto           }
                    thumbnail   = { clanInfo.foto_miniatura }
                />
                <ClanActions
                    clanCode    = { clanCode                 }
                    onJoin      = { () => this.refreshInfo() }
                 />
                {isAdmin && (
                    <ClanRequests 
                        clanCode = { clanCode } 
                        onApprove = { this.onApprove.bind(this) }
                    />
                )}
                <ClanMemberslist 
                    members     = { clanInfo.miembros       }
                    navigation  = { this.props.navigation   }
                    clanCode    = { clanCode                }
                    isAdmin     = { isAdmin                 }
                />
            </ClanDetailWrapper>
        );
    }
}

ClanDetail.propTypes = {
    clanCode    : PropTypes.any,
    navigation  : PropTypes.any,
    doPost      : PropTypes.func,
    adminClans  : PropTypes.array,
};

export default withApi(withUserData(ClanDetail));