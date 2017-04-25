import React from 'react';

import './Footer.scss';

const heart = require('react-icons/lib/io/heart.js');

class Footer extends React.Component {

    render() {
        return (
            <footer className="Footer">
                <div className="brand">Partenaire Pala</div>
                <div className="links-container">
                    <div className="links">
                        <div>Créer une partie</div>
                        <div>Rechercher une partie</div>
                    </div>
                    <div className="links">
                        <div>Partenaire - Fronton.net</div>
                        <div>Nous contacter</div>
                    </div>
                </div>
                <div className="author">
                    Made with
                    <span className="heart">
                        {React.createElement(heart, null)}
                    </span>
                    by Pike Apps
                </div>
            </footer>
        )
    }
}

export default Footer;
