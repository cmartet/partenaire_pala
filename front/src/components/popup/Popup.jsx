import Dialog       from 'material-ui/Dialog';
import FlatButton   from 'material-ui/FlatButton';
import PropTypes    from 'prop-types';
import React        from 'react';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    cancelButton: PropTypes.bool,
    handleCancel: PropTypes.func
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
                onTouchTap={() => this.props.handleClose(true, true)}
            />);

        const OkButton = (
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.props.handleClose(true, false)}
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