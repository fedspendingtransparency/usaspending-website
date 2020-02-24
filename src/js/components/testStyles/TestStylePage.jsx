/**
 * TestStylePage.jsx
 * Created by Kevin Li 1/3/17
 */

import React from 'react';
import { forEach } from 'lodash';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';

import * as Icons from '../sharedComponents/icons/Icons';

import IconsExample from './IconsExample';
import ButtonsExample from './ButtonsExample';

require('pages/testStyle/testStyle.scss');

export default class TestStylePage extends React.Component {
    render() {
        const icons = [];

        forEach(Icons, (value, key) => {
            const component = (<IconsExample
                key={key}
                icon={value}
                label={`Icon.${key}`} />);
            icons.push(component);
        });

        return (
            <div className="usa-da-test-page">
                <MetaTags {...MetaTagHelper.stylePageMetaTags} />
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
