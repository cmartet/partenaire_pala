import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    open: React.PropTypes.bool,
    handleClose: React.PropTypes.func,
    cancelButton: React.PropTypes.bool
};

const defaultProps = {
    cancelButton: true,
    open: false
};

class Popup extends React.Component {

    render() {
        const CancelButton = (
            <FlatButton
                label="Annuler"
                primary={true}
                onTouchTap={this.props.handleClose}
            />);

        const OkButton = (
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.handleClose}
            />
        );

        return (
            <div>
                <Dialog
                    title={this.props.title}
                    onRequestClose={this.props.handleClose}
                    actions={this.props.cancelButton ? [CancelButton, OkButton] : OkButton}
                    modal={false}
                    open={this.props.open}>
                    {this.props.message}
                </Dialog>
            </div>
        );
    }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

export default Popup;