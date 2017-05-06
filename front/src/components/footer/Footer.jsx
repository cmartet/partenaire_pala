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
                        <div><a href={process.env.PUBLIC_URL + '/#/create'}>Créer une partie</a></div>
                        <div><a href={process.env.PUBLIC_URL}>Rechercher une partie</a></div>
                    </div>
                    <div className="links">
                        <div><a href="http://www.frontons.net/">Partenaire - Frontons.net</a></div>
                        <div><a href={"mailto:pike.app.team@gmail.com"}>Nous contacter</a></div>
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
