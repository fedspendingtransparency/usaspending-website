/**
 * HomePage.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React from 'react';
import Header from './sharedComponents/header/Header';
import Welcome from './Welcome';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="flex-wrapper home-page">
                <Header />
                <main id="main-content">
                    <Welcome />
                </main>
            </div>
        );
    }
}
