import React            from 'react';
import * as util        from '../../utils'
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle
}                       from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton       from 'material-ui/FlatButton';
import PropTypes        from 'prop-types';
import RaisedButton     from 'material-ui/RaisedButton';
import TextField        from 'material-ui/TextField';
import {Row, Col}       from 'react-flexbox-grid';

import './SearchPlace.scss';

const propTypes = {
    initSearch: PropTypes.string,
    isSearchInProgress: PropTypes.bool,
    onSelectPlace: PropTypes.func,
    places: PropTypes.array,
    searchAction: PropTypes.func,
    selectedPlace: PropTypes.object
};

const defaultProps = {
    initSearch: undefined,
    places: [],
    selectedPlace: undefined
};

class SearchPlace extends React.Component {

    constructor(props) {
        super(props);

        let initSearch = props.initSearch;
        if (props.selectedPlace && props.selectedPlace.name) {
            initSearch = props.selectedPlace.name.split(',')[0];
        }

        this.state = {
            searchedPlace: initSearch,
            error: null,
            selectedPlace: props.selectedPlace,
            searchedAlready: false
        }
    };

    componentDidMount = () => {
        if (this.state.searchedPlace !== undefined)
            this.props.searchAction(this.state.searchedPlace);
    };

    handleChange = (inputName, event) => {
        this.setState({[inputName]: event.target.value});
    };

    searchPlaces = () => {
        if (this.state.searchedPlace.length < 3) {
            this.setState({'error': 'Veuillez taper au moins 3 caractères'});
        }
        else {
            this.setState({'error': null});
            this.setState({'searchedAlready': true});
            this.props.searchAction(this.state.searchedPlace);
        }
    };

    selectPlace = (place) => {
        return () => {
            this.setState({'selectedPlace': place});
            this.props.onSelectPlace(place);
        }
    };

    formatPlaceName = (placeName) => {
        const nameRegex = /\d*\s([a-zA-Z'\-\s]*),.*/g;
        return nameRegex.exec(placeName)[1];
    };

    displayOverlay = (place) => {
        const cardTitle = this.formatPlaceName(place.name) + " (" + util.mapPlaceType(place.type) + ")";

        const cardTitleStyle = {
            padding: '0 5px 5px 10px'
        };

        const titleStyle = {
            fontSize: '1.2em'
        };

        const subtitleStyle = {
            fontSize: '0.8em'
        };

        return (<CardTitle title={cardTitle}
                           titleStyle={titleStyle}
                           style={cardTitleStyle}
                           subtitleStyle={subtitleStyle}
                           subtitle={place.location.address}/>);
    };

    displayPlaceCard = (place) => {
        return <Card
            className={"card-place " + (this.state.selectedPlace.fronton_id === place.fronton_id ? 'selected' : '')}
            key={place.fronton_id}
            onClick={this.selectPlace(place)}>
            <CardMedia
                overlayContentStyle={{paddingTop:0}}
                overlay={this.displayOverlay(place)}>
                <div className="cropped-img"
                     style={{backgroundImage: 'url(' + place.photo + ')'}}>
                </div>
            </CardMedia>
            <CardActions style={{padding: 0}}>
                <FlatButton
                    style={{padding:0}}
                    fullWidth={true}
                    label="Choisir ce fronton"/>
            </CardActions>
        </Card>;
    };

    render() {

        return (
            <div className="SearchPlace">
                <Row>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <div className="place-filter-container">
                            <TextField
                                type="text"
                                floatingLabelText="Rechercher un fronton"
                                value={this.state.searchedPlace || ''}
                                onChange={this.handleChange.bind(this, 'searchedPlace')}
                                errorText={this.state.error}
                                onKeyPress={(e) => {if (e.key === 'Enter') this.searchPlaces()}}
                                underlineFocusStyle={{borderColor: "#009543"}}
                                floatingLabelFocusStyle={{color: "#009543"}}
                            />
                            <RaisedButton
                                className="margin-left-l basque-theme green"
                                label="Rechercher"
                                primary={true}
                                onTouchTap={this.searchPlaces.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="card-container">
                        {
                            (this.props.places.length > 0 && !this.props.isSearchInProgress) ?
                                this.props.places.map(this.displayPlaceCard) :
                                this.props.isSearchInProgress ?
                                    <CircularProgress size={80} thickness={5}/> :

                                    this.state.searchedAlready ?
                                        (<div>Pas de résultat. Et pas de résultat ... pas d'palais.</div>) : null
                        }
                    </div>
                </Row>
            </div>
        )
    }
}

SearchPlace.propTypes = propTypes;
SearchPlace.defaultProps = defaultProps;

export default SearchPlace;
