import React            from 'react';
import Popup            from '../popup/Popup'
import RaisedButton     from 'material-ui/RaisedButton';
import FlatButton       from 'material-ui/FlatButton';
import {
    Step,
    Stepper,
    StepLabel,
}                       from 'material-ui/Stepper';

import './CreateStepper.scss';

const STEP_MAX = 3;

const propTypes = {
    areInfoOK: React.PropTypes.func,
    createGame: React.PropTypes.func,
    closePopup: React.PropTypes.func,
    gameCreation: React.PropTypes.object,
    getStepContent: React.PropTypes.func,
    handleLastStep: React.PropTypes.func,
    openPopup: React.PropTypes.bool
};

class CreateStepper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getNextButtonLabel = () => {
        const {stepIndex} = this.state;
        return stepIndex < STEP_MAX ? 'Suivant' : 'C\'est tout bon, créer cette partie';
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex < STEP_MAX) {
            if (stepIndex === STEP_MAX - 1) {
                this.props.handleLastStep();
            }

            if (this.props.areInfoOK(stepIndex))
                this.setState({stepIndex: stepIndex + 1});
        }
        else {
            this.props.createGame();
        }
    };

    render() {
        const {stepIndex} = this.state;

        return (<div style={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepLabel>
                            Sélection du terrain
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel >
                            Informations sur la partie
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Qui joue ?
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Vérification des informations
                        </StepLabel>
                    </Step>
                </Stepper>

                <Popup title="Connexion obligatoire"
                       message="Il faut vous connecter pour continuer !"
                       open={this.props.openPopup}
                       cancelButton={false}
                       handleClose={this.props.closePopup}/>

                <div className="step-nav-container">
                    <div>{this.props.getStepContent(stepIndex)}</div>
                    <div style={{marginTop: 12}}>
                        <FlatButton
                            label="Précédent"
                            disabled={stepIndex === 0 || this.props.gameCreation.inProgress || this.props.gameCreation.success}
                            onTouchTap={() => this.handlePrev()}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label={this.getNextButtonLabel()}
                            hidden={stepIndex === 2}
                            primary={true}
                            onTouchTap={() => this.handleNext()}
                            disabled={this.props.gameCreation.inProgress || this.props.gameCreation.success}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

CreateStepper.propTypes = propTypes;

export default CreateStepper;
