/**
 * TestStylePage.jsx
 * Created by Kevin Li 1/3/17
 */

import React from 'react';
import _ from 'lodash';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import * as Icons from '../sharedComponents/icons/Icons';

import IconsExample from './IconsExample';
import ButtonsExample from './ButtonsExample';

export default class TestStylePage extends React.Component {
    render() {
        const icons = [];

        _.forEach(Icons, (value, key) => {
            const component = (<IconsExample
                key={key}
                icon={value}
                label={`Icon.${key}`} />);
            icons.push(component);
        });

        return (
            <div className="usa-da-test-page">
                <Header />
                <main id="main-content">
                    <div className="page-content">
                        <div className="page-wrapper">
                            <ButtonsExample />
                            <h3>Icons</h3>
                            <ul className="icon-list">
                                {icons}
                            </ul>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
