/**
 * HomePage.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React from 'react'
import Header from './sharedComponents/Header.jsx'
import Welcome from './Welcome.jsx'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-wrapper home-page">
                <Header/>
                <Welcome/>
            </div>
        );
    }

}
