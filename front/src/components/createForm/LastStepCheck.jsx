import React            from 'react';
import * as utils       from '../../utils'
import CircularProgress from 'material-ui/CircularProgress';
import GameInfo         from '../search/GameInfo';
import Paper            from 'material-ui/Paper';
import Popup            from '../popup/Popup'
import PropTypes        from 'prop-types';
import RaisedButton     from 'material-ui/RaisedButton';

import './LastStepCheck.scss';

const propTypes = {
    connectedUserName: PropTypes.string,
    gameCreation: PropTypes.object,
    gameInfo: PropTypes.object,
    gameToUpdate: PropTypes.object,
    games: PropTypes.array
};

class LastStepCheck extends React.Component {

    redirectToSearchPage = () => {
        window.location.href = '/';
    };

    showCardWhenGameAtSameTime () {
        // Same game we're talking about here
        if(this.props.gameToUpdate && this.props.games.length === 1) {
            return;
        }

        if(this.props.games.length > 0)
        {
            return (<Paper className="warning-already-exists" zDepth={2}>
                {this.props.games.length === 1 ?
                    <div>
                        <div>Une partie pour le même lieu et la même heure a déjà été planifiée !</div>
                        <div>Créée par {this.props.games[0].creator.name},
                            pour un début à {utils.getFormattedTime(this.props.games[0].date)}</div>
                    </div>
                    :
                    <div>Plusieurs parties pour le même lieu et la même heure ont déjà été planifiées !
                        <ul>
                            {this.props.games.map(game => {
                                return <li>Créée par {game.creator.name}
                                    pour un début à {utils.getFormattedTime(game.date)}</li>
                            })}
                        </ul>
                    </div>}
            </Paper>);
        }
    };

    showCardWhenUserIsNotConnected () {
        if(!this.props.connectedUserName) {
            return (<Paper className="warning-already-exists" zDepth={2}>
                <div>
                    <div className="explanations">Vous devez vous connecter pour continuer !</div>
                    <RaisedButton
                        label="Connexion"
                        className="basque-theme green"
                        fullWidth={true}
                        onClick={utils.loginFB}/>
                </div>
            </Paper>);
        }
    };

    render() {
        return (<div className="LastStepCheck">
                {this.showCardWhenGameAtSameTime()}
                {this.showCardWhenUserIsNotConnected()}

                {this.props.gameCreation.inProgress ?
                    <CircularProgress size={60} thickness={7}/> :

                    <GameInfo
                        level={this.props.gameInfo.level}
                        placePicture={this.props.gameInfo.place.photo}
                        place={this.props.gameInfo.place.name}
                        placeType={this.props.gameInfo.place.type}
                        maxPlayers={this.props.gameInfo.maxMissingPlayers}
                        creator={this.props.connectedUserName || 'Vous'}
                        date={this.props.gameInfo.date}
                        displayMode={true}
                        players={this.props.gameInfo.players}/>
                }

                <Popup title="Game On !"
                       message="La partie est bien enregistrée !"
                       handleClose={this.redirectToSearchPage}
                       open={this.props.gameCreation.success}
                       cancelButton={false}/>

                <Popup title="Oups ..."
                       message="Une erreur est survenue. Veuillez ré-essayer, ou contactez-nous !"
                       open={this.props.gameCreation.error}
                       handleClose={() => location.reload()}
                       cancelButton={false}/>

            </div>
        )
    }
}

LastStepCheck.propTypes = propTypes;

export default LastStepCheck;
