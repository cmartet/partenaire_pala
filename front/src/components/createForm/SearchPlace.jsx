import React            from 'react';
import * as util        from '../../utils'
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle, CardText
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
        if(props.selectedPlace && props.selectedPlace.name) {
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
        if(this.state.searchedPlace !== undefined)
            this.props.searchAction(this.state.searchedPlace);
    };

    // componentWillReceiveProps = (nextProps) => {
    //     if (nextProps.selectedPlace.name && this.state.searchedPlace === undefined) {
    //         this.setState({'selectedPlace': nextProps.selectedPlace});
    //         if(nextProps.selectedPlace.name.indexOf(',')) {
    //             this.setState({'searchedPlace': nextProps.selectedPlace.name.split(',')[0]}, () => {
    //                 this.props.searchAction(this.state.searchedPlace);
    //             });
    //         }
    //     }
    // };

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
                                this.props.places.map(place => {
                                    return <Card
                                        className={"card-place " + (this.state.selectedPlace.fronton_id === place.fronton_id ? 'selected' : '')}
                                        key={place.fronton_id}
                                        onClick={this.selectPlace(place)}>
                                        <CardMedia>
                                            <div className="cropped-img"
                                                 style={{backgroundImage: 'url(' + place.photo + ')'}}>
                                            </div>
                                        </CardMedia>
                                        <CardTitle title={place.name} subtitle={util.mapPlaceType(place.type)}/>
                                        <CardText>{place.location.address}</CardText>
                                        <CardActions>
                                            <FlatButton
                                                fullWidth={true}
                                                label="Choisir ce fronton"/>
                                        </CardActions>
                                    </Card>;
                                }) :
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
