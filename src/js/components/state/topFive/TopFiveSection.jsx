/**
 * TopFiveSection.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';

import { categories as topCategories } from 'dataMapping/state/topCategories';

export default class TopFiveSection extends React.Component {
    render() {
        return (
            <div
                className="state-section topfive"
                id="state-top">
                <h4
                    className="topfive__title"
                    tabIndex="0">
                    Top 5
                </h4>
                <hr className="results-divider" />
                <div className="topfive__description">
                    Lorem ipsum
                </div>
            </div>
        );
    }
}
